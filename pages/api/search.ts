// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Sort, elasticQuery } from '../../utils/elastic'

// FOR TESTING
const wildcardQuery = {
  "dataAsJson.arbitrary.collection_name": "cyber"
};
const sortQuery = [{ height: { order: "asc" } }];
console.log('stringified: ', JSON.stringify(sortQuery))
console.log('stringified: ', JSON.stringify(wildcardQuery))
// FOR TESTING

const ERR = (param: string) => `Incorrect ${param} parameter format. Please provide a valid JSON stringified object.`

const checkJSON = (toParse: string, err: string) => {
  try {
    console.log('we will parse ', toParse)
    return !!toParse ? JSON.parse(toParse) : null;
  } catch (e) {
    throw new Error( ERR(err));
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    try {
      const sort = checkJSON(req.query.sort, 'sort');
      const search = checkJSON(req.query.search, 'search');
      const page = req.query.page ? parseInt(req.query.page) : undefined;
      const perPage = req.query.limit ? parseInt(req.query.limit) : undefined;

      console.log(req.query)
      console.log('sort ', sort)
      console.log('filter ', search)
  
      const result = await elasticQuery(page, perPage, sort, search);
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({error: e.message});
    }
  } 
}
