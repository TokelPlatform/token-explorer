import { conf, elasticclient } from "../config/elastic";

import { index } from "../config";

type Order = {
  order: string;
};

export type Sort = { [sortBy: string]: Order };

export type Wildcard = {
  [path: string]: string;
};

type ElasticQuery = {
  index: string | undefined;
  from: number;
  size: number;
  sort?: any;
  filter_path?: any;
  query?: {
    match_phrase_prefix?: {
      [key: string]: {
        query: string;
      };
    };
    wildcard?: {
      [key: string]: {
        value: string;
        case_insensitive: boolean;
      };
    };
    bool?: {
      must: {
        match: {
          [x: string]: string;
        };
      };
    };
    range?: {
      [key: string]: {
        [match: string]: number;
      }
    }
  };
};

const wildcardQuery = (key: string, value: string) => ({
  value: `*${value}*`,
  case_insensitive: true,
});

const matchQuery = (key: string, value: string) => ({
  must: {
    match: {
      [key]: value,
    },
  },
});

export const elasticQuery = async (
  page?: number,
  perPage: number = conf.maxPerPage,
  sort?: Sort[],
  filterBy?: Wildcard[]
) => {
  const itemsPerPage =
    !!perPage && perPage > conf.maxPerPage
      ? conf.maxPerPage
      : !!perPage
      ? perPage
      : 10;
  console.log("limit: ", itemsPerPage);
  console.log("page: ", page);
  let q: ElasticQuery = {
    index: index.TOKENS,
    from: !!page ? (page - 1) * itemsPerPage : 0,
    size: itemsPerPage,
  };

  if (sort) {
    q.sort = sort;
  }

  if (filterBy) {
    filterBy.forEach((value) => {
      const key: string = Object.keys(value)[0].toString();
      let words = typeof value[key] === "string" ? value[key].split(" ") : "";
      q.query = q.query ? q.query : {};
      if (words.length > 1) {
        q.query.match_phrase_prefix = {
          [key]: {
            query: value[key],
          },
        };
      } else {
        const match = ["tokenid", "id", "owner"];
        const numericMatches = ["height", "supply"];
        if (numericMatches.includes(key)) {
          q.query.range = q.query.range ? q.query.range : {};
          q.query.range[key] = value[key] as any;
        } else if (match.indexOf(key) !== -1) {
          q.query.bool = matchQuery(key, value[key]);
        } else {
          q.query.wildcard = {};
          q.query.wildcard[key] = wildcardQuery(key, value[key]);
        }
      }
    });
  }

  // Optimize only for what we need (source blockchain objects and totals)
  q.filter_path = "hits.hits._source,hits.total.value";

  console.log("query: ", q.query);
  console.log("wildcard: ", q.query?.wildcard);

  const results = elasticclient.search(q);
  
  return results;
};

export const update = async (index: string, id: string, body: any) =>
  elasticclient.update({
    index: index,
    id,
    body: { doc: body },
  });

export const get = async (index: string, id: string) =>
  elasticclient.get({
    index: index,
    id,
  });
