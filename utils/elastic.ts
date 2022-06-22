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
    wildcard?: {}
  };
};

const wildcardQuery = (key: string, value: string) => ({
    value: `*${value}*`,
    case_insensitive: true
})

const matchQuery = (key: string, value: string) => ({
    bool: {
      must: {
        match: {
          [key]: value
        }
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
    q.query = {};
    q.query.wildcard ={}
    filterBy.forEach((value) => {
      let key = Object.keys(value)[0];
      
      // exact match for these
      const match = ['tokenid', 'id', 'owner', 'height']
      if (match.indexOf(key) !== -1) {
        q.query = matchQuery(key, value[key]);
      } else {
        q.query.wildcard[key] =   wildcardQuery(key, value[key])
      }
    })
  }

  console.log('QUERY: ', q);
  return elasticclient.helpers.search(q);
};
