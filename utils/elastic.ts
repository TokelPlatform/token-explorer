import { elasticConf } from "../config";
import { elasticclient } from "../config/elastic"

type Order = {
  order: string;
};

export type Sort = { [sortBy: string]: Order };

export type Wildcard = {
  [path: string]: string;
};

type ElasticQuery = {
  index: string;
  from: number;
  size: number;
  sort?: any;
  query?: {
    match_phrase_prefix?: {
      [key: string]: {
        "query": string
      }
    },
    wildcard?: {
      [key: string] : {
        value: string,
        case_insensitive: boolean
      }
    };
    bool?: {
      must: {
        match: {
          [x: string]: string
        }
      }
    }
  };
};

const wildcardQuery = (key: string, value: string) => ({
    value: `*${value}*`,
    case_insensitive: true
})

const matchQuery = (key: string, value: string) => ({
    must: {
      match: {
        [key]: value
      }
    }
})

export const elasticQuery = async (
  page?: number,
  perPage: number = elasticConf.maxPerPage,
  sort?: Sort[],
  filterBy?: Wildcard[]
) => {
  const itemsPerPage = (!!perPage && perPage > elasticConf.maxPerPage) ? elasticConf.maxPerPage : (!!perPage ? perPage : 10);
  console.log('limit: ', itemsPerPage)
  console.log('page: ', page)
  let q: ElasticQuery = {
    index: elasticConf.index,
    from: !!page ? (page - 1) * itemsPerPage : 0,
    size: itemsPerPage,
  };
  
  if (sort) {
    q.sort = sort;
  }

  if (filterBy) {
    filterBy.forEach((value) => {
      const key: string = Object.keys(value)[0].toString();
      let words = value[key].split(' ');
      q.query = q.query ? q.query : {};
      if (words.length > 1) {
        q.query.match_phrase_prefix = {
          [key]: {
            "query": value[key]
          }
        }

  
      } else {
        const match = ['tokenid', 'id', 'owner', 'height']
        if (match.indexOf(key) !== -1) {
          q.query.bool = matchQuery(key, value[key]);
        } else {
          q.query.wildcard = {};
          q.query.wildcard[key] = wildcardQuery(key, value[key])
        }
      }
    })
  }

  console.log('query: ', q.query);
  console.log('wildcard: ', q.query?.wildcard);
  return elasticclient.helpers.search(q);
};
