const { conf, elasticclient } = require("../config/elastic");

import esb from "elastic-builder";
import { index } from "../config";

export type KeyValueType = {
  [field: string]: string;
};

const getItemsPerPage = (perPage: number): number =>
  !!perPage && perPage > conf.maxPerPage
    ? conf.maxPerPage
    : !!perPage
    ? perPage
    : 10;

export const elasticQuery = async (
  page?: number,
  limit: number = conf.maxPerPage,
  sort?: KeyValueType,
  search?: KeyValueType
) => {
  let requestBody = esb.requestBodySearch();

  requestBody.from(!!page ? (page - 1) * limit : 0);
  requestBody.size(getItemsPerPage(limit));

  let sorts = [];
  for (const field in sort) {
    sorts.push(esb.sort(field, sort[field]));
  }
  requestBody.sorts(sorts);

  if (search) {
    if (Object.keys(search).length > 1) {
      const matchQueries = [];
      for (const field in search) {
        matchQueries.push(esb.matchQuery(field, search[field]));
      }
      requestBody.query(esb.boolQuery().filter(matchQueries));
    } else {
      const term = Object.keys(search)[0];
      const value = search[term];
      requestBody.query(esb.matchQuery(term, value));
    }
  }
  console.log(requestBody.toJSON());
  return elasticclient.search({
    index: index.TOKENS,
    ...requestBody.toJSON(),
  });
};

export const update = async (index: string, id: string, body: any) =>
  elasticclient.update({
    index: index,
    id,
    body: { doc: body },
  });

export const get = async (index: string, id: string) =>
  elasticclient.get({
    index,
    id,
  });
