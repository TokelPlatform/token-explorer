import { KeyValueType, elasticQuery, get, update } from "./elastic";

import Joi from "joi";
import { index } from "config";

//*** Validation schemas  */
export const tokenIdSchema = Joi.object({
  id: Joi.string().length(64).hex().required(),
});

export const tokenUpdateSchema = Joi.object({
  featured: Joi.boolean().optional(),
});

const KeyValueSchema = Joi.object()
  .optional()
  .pattern(Joi.string(), Joi.string());

export const searchQuerySchema = Joi.object({
  sort: KeyValueSchema,
  search: KeyValueSchema,
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

const validate = (schema: Joi.ObjectSchema<any>, object: any) => {
  const valid = schema.validate(object);
  if (valid.error) {
    console.log(valid);
    throw new Error(valid.error.toString());
  }
};

type TokenType = {
  featured: boolean;
};

/**
 *
 * @param page   number     .... 1
 * @param limit  number     .... 10
 * @param sort   sortType   .... {"height": "desc", "age": "asc"}
 * @param search searchType .... {"dataAsJson.arbitrary.collection_name":"cyber", "owner": 34123123}
 * @returns
 */
export const getTokens = async (
  page: number,
  limit: number,
  sort: KeyValueType,
  search: KeyValueType
) => {
  validate(searchQuerySchema, { page, limit, sort, search });
  return elasticQuery(page, limit, sort, search);
};

/**
 *
 * @param id tokenid, hex string
 * @returns
 */
export const getToken = async (id: string) => {
  validate(tokenIdSchema, { id });
  const doc = await get(index.TOKENS, id.toString());
  return doc._source ? doc._source : doc;
};

/**
 *
 * @param id tokenid, hex string
 * @param body parameters to update
 * @returns
 */
export const editToken = async (id: string, body: TokenType) => {
  validate(tokenIdSchema, { id });
  return update(index.TOKENS, id, body);
};
