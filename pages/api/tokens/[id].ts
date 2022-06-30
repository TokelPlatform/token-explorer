// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Joi from "joi";
import { index } from "config/index";
import { update } from "utils/elastic";
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
    if (req.method === "PUT") {
      try {
        await update(index.TOKENS, req.query.id.toString(), req.body);
        return res.status(200).end();
      } catch (e) {
        console.log(e);
        return res.status(400).json(e);
      }
    }
    res.status(404).end();
  }
);
