// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTokens, searchQuerySchema } from "utils/tokens";
import parseSearchParams, {
  NextApiRequestWithExtraParams,
} from "utils/middlewares/parseSearchParams";

import { ValidationError } from "joi";
import nc from "next-connect";
import validate from "utils/middlewares/validate";

export default nc({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse, next: any) => {
    console.error(err.stack);
    res.status(500).end();
  },
  onNoMatch: (_, res: NextApiResponse) => {
    res.status(404).end();
  },
})
  .use(parseSearchParams)
  .get(
    validate({ query: searchQuerySchema }),
    async (req: NextApiRequestWithExtraParams, res: NextApiResponse) => {
      try {
        console.log(req.query);
        const result = await getTokens(
          req.query.page,
          req.query.limit,
          req.query.sort,
          req.query.search
        );
        return res.status(200).json(result);
      } catch (e: ValidationError | any) {
        console.log(e);
        res.status(400).json(e?.message);
      }
    }
  );
