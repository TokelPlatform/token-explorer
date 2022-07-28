const { TOKENS } = require("../config/index");

const logger = require("pino")();
const PQueue = require("p-queue");
const { elasticclient } = require("../config/elastic.js");
const esb = require("elastic-builder");
const { tokelRPC } = require("../config/tokel.js");

const info = (prefix: string, msg: any) => logger.info(prefix + ":  " + msg);

const unpackArbitraryData = (tokenData: any) => {
  let arbitrary = null;
  // malfromated arbitrary data
  if (tokenData.dataAsJson?.arbitrary === "") {
    delete tokenData.dataAsJson.arbitrary;
  } else if (tokenData.dataAsJson?.arbitrary) {
    arbitrary = Buffer.from(tokenData.dataAsJson.arbitrary, "hex").toString(
      "utf-8"
    );
    try {
      arbitrary = JSON.parse(arbitrary);
    } catch (e) {
      // logger.error(e);
      if (arbitrary !== "") {
        logger.error(
          tokenData.tokenid +
            " Arbitrary data is not in JSON format. It is a string: " +
            arbitrary
        );
        arbitrary = { stringValue: arbitrary };
      } else {
        logger.error(
          tokenData.tokenid + " Arbitrary data is an empty string: "
        );
      }
    }
    // number_in_collection is string, since people put some long values in there
    if (arbitrary?.number_in_collection) {
      arbitrary.number_in_collection =
        arbitrary.number_in_collection.toString();
    }
    if (arbitrary.date) {
      arbitrary.date = new Date(arbitrary.date.replace("th", "")).getTime();
    }
    return arbitrary;
  }
};

const createNewRecord = async (token: any, assetsCC: any) => {
  await elasticclient.index({
    index: TOKENS,
    id: token.tokenid,
    document: {
      ...token,
      featured: false,
      created: new Date().getTime(),
      updated: new Date().getTime(),
      tokenDEX: assetsCC,
    },
  });
};

const updateRecord = async (token: any, assetsCC: any) => {
  await elasticclient.update({
    index: TOKENS,
    id: token,
    body: {
      doc: {
        tokenDEX: assetsCC,
        updated: new Date().getTime(),
      },
    },
  });
};

const processTokenInformation = async (token: any, idx: number) => {
  const logPref = "processTokenInformation";
  let result = await tokelRPC.tokenv2infotokel(token);

  if (result.tokenid) {
    logger.info("running index for " + result.tokenid);
    const arbitrary = unpackArbitraryData(result);
    if (arbitrary) {
      result = {
        ...result,
        dataAsJson: {
          ...result.dataAsJson,
          arbitrary,
        },
      };
    }

    const assetsCC = await tokelRPC.tokenv2orders(token);
    if (assetsCC.length > 0) {
      info(logPref, result.tokenid + " has assetCC data ");
    }

    const tokenExists = await elasticclient.exists({
      index: TOKENS,
      id: result.tokenid,
    });
    if (!tokenExists) {
      info(logPref, token + " is new.");
      await createNewRecord(result, assetsCC);
    } else if (assetsCC && assetsCC.length > 0) {
      // update the record because it exists and the only part that can be updated is the tokenDEX information
      info(logPref, token + " exists - updating it.");
      await updateRecord(result.tokenid, assetsCC);
    } else {
      info(logPref, token + ": nothing to do.");
    }
  } else {
    logger.error(logPref + ": There is no tokenid");
    logger.info(logPref + ": " + token);
    logger.info(logPref + ": " + result);
  }
};

/**
 * Gets the current chain height
 * @returns
 */
const getEndHeight = async () => {
  try {
    const info = await tokelRPC.getinfo();
    return info.blocks;
    // return 100;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

/**
 * Returns the height of the last record from elastic
 * @returns
 */
const getBeginHeight = async () => {
  const logPref = "getBeginHeight";
  try {
    if (process.env.REINDEX) {
      return 0;
    }
    // request elastic to get the latest record and get its height.
    const indexExists = await elasticclient.indices.exists({
      index: TOKENS,
    });
    info(logPref, "The index " + TOKENS + " exists: " + indexExists);
    if (indexExists) {
      let requestBody = esb
        .requestBodySearch()
        .sort(esb.sort("height", "desc"));
      let lastRecord: any = await elasticclient.search({
        index: TOKENS,
        ...requestBody.toJSON(),
      });
      lastRecord = lastRecord.hits?.hits
        ? lastRecord.hits?.hits[0]?._source.height
        : lastRecord[0]?.height;
      return lastRecord ?? "0";
    }
    return 0;
  } catch (e) {
    logger.error(e);
  }
};

const getTokens = async (beginHeight: any, endHeight: any) => {
  try {
    const tokens = await tokelRPC.tokenv2list(
      JSON.stringify({ endHeight, beginHeight })
    );
    return tokens;
  } catch (e) {
    logger.error(e);
    return [];
  }
};

const processBatch = async (
  beginHeight: any,
  endHeight: any,
  batchCounter: any,
  queue: any
) => {
  const tokens = await getTokens(beginHeight, endHeight);
  logger.info(tokens);
  logger.info(
    "Running the batch from " +
      beginHeight +
      " to " +
      endHeight +
      ". Found tokens : " +
      tokens.length
  );
  if (
    tokens === undefined ||
    tokens.length === undefined ||
    tokens.length === 0
  ) {
    return;
  }
  return tokens.map((element: any, idx: number) =>
    queue.add(() => processTokenInformation(element, idx * (batchCounter + 1)))
  );
};
// arbitrary - unpack to insert
const populate = async () => {
  try {
    const BATCH_SIZE = 100000;
    let beginHeight = await getBeginHeight();
    let endHeight = await getEndHeight();

    const queue = new PQueue.default({ concurrency: 10 });
    logger.info("endHeight: " + endHeight);
    logger.info("beginHeight: " + beginHeight);

    endHeight = Number(endHeight);
    beginHeight = Number(beginHeight);
    let batches = [];
    let batchCounter = 0;
    for (let i = beginHeight; i <= BATCH_SIZE + endHeight; i += BATCH_SIZE) {
      batches.push(processBatch(i, i + BATCH_SIZE, batchCounter, queue));
      batchCounter++;
    }

    await Promise.all(batches);
    return;
  } catch (error) {
    logger.error(error);
  }
};

populate();
