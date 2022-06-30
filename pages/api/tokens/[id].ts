// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { get, update } from "utils/elastic";

import Joi from "joi";
import { index } from "config/index";
import validate from "utils/middlewares/validate";

const schema = Joi.object({
  id: Joi.string().length(64).hex().required(),
});

const bodySchema = Joi.object({
  featured: Joi.boolean(),
});

export default validate(
  { query: schema, body: bodySchema },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id.toString();
      if (req.method === "PUT") {
        await update(index.TOKENS, id, req.body);
        return res.status(200).end();
      } else if (req.method === "GET") {
        const doc = await get(index.TOKENS, id);
        return res.status(200).json({ doc: doc?._source });
      } else {
        res.status(404).end();
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
);
