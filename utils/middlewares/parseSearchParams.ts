import { NextApiRequest, NextApiResponse } from "next";

const ERR = (param: string) =>
  `Incorrect ${param} parameter format. Please provide a valid JSON stringified object.`;

const checkJSON = (toParse: any, err: string) => {
  try {
    console.log("we will parse ", toParse);
    return !!toParse ? JSON.parse(toParse) : null;
  } catch (e) {
    throw new Error(ERR(err));
  }
};

const searchParams = ["sort", "search"];

export type NextApiRequestWithExtraParams = NextApiRequest & {
  query: {
    page: number;
    limit: number;
    sort: any;
    search: any;
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  req: NextApiRequestWithExtraParams,
  res: NextApiResponse,
  next: any
) => {
  try {
    searchParams.forEach((param) => {
      if (req.query[param]) {
        req.query[param] = checkJSON(req.query[param], param);
        console.log("parsed param: ", req.query[param]);
      }
    });
    req.query.page = req.query.page ? parseInt(req.query.page.toString()) : 1;
    req.query.limit = req.query.limit
      ? parseInt(req.query.limit.toString())
      : 30;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
