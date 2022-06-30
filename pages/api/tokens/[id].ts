// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { get, update } from "utils/elastic";

import Joi from "joi";
import { index } from "config/index";
import nc from "next-connect";
import validate from "utils/middlewares/validate";

const querySchema = Joi.object({
  id: Joi.string().length(64).hex().required(),
});

const bodySchema = Joi.object({
  featured: Joi.boolean().optional(),
});

export default nc({
  onError: (err, _, res: NextApiResponse, __) => {
    console.error(err.stack);
    res.status(500).end();
  },
  onNoMatch: (_, res: NextApiResponse) => {
    res.status(404).end();
  },
})
  .get(
    validate({ query: querySchema }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const id = req.query.id.toString();
      const doc = await get(index.TOKENS, id);
      return res.status(200).json({ doc: doc?._source });
    }
  )
  .put(
    validate({ query: querySchema, body: bodySchema }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      const id = req.query.id.toString();
      await update(index.TOKENS, id, req.body);
      return res.status(200).end();
    }
  );
