// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Joi from "joi";
import validate from "../../../lib/middlewares/validate";

const schema = Joi.object({
  id: Joi.string().length(64).hex().required(),
});

export default validate(
  { query: schema },
  (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
      res.status(200).json({ success: req.query.id });
    } else {
      res.status(404).end();
    }
  }
);
