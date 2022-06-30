// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import parseSearchParams, {
  NextApiRequestWithExtraParams,
} from "utils/middlewares/parseSearchParams";

import Joi from "joi";
import { elasticQuery } from "utils/elastic";
import nc from "next-connect";
import validate from "utils/middlewares/validate";

//[{ height: { order: "asc" } }];
const sortSchema = Joi.object({
  height: {
    order: Joi.string().valid("asc", "desc"),
  },
});

//{"dataAsJson.arbitrary.collection_name":"cyber"}
const searchSchema = Joi.object()
  .optional()
  .pattern(Joi.string(), Joi.string());

const querySchema = Joi.object({
  sort: Joi.array()
    .optional()
    .items(sortSchema)
    .default([{ height: { order: "desc" } }]),
  search: searchSchema,
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

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
    validate({ query: querySchema }),
    async (req: NextApiRequestWithExtraParams, res: NextApiResponse) => {
      console.log(req.query);
      const result = await elasticQuery(
        req.query.page,
        req.query.limit,
        req.query.sort,
        req.query.search
      );
      return res.status(200).json(result);
    }
  );
