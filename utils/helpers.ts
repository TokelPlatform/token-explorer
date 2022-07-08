import { DEFAULT_IPFS_FALLBACK_GATEWAY } from "./defines";
import { EXTRACT_IPFS_HASH_REGEX } from "./defines";
import Identicon from "identicon.js";
import Token from "types/Token";

export const extractIPFSHash = (url: string): string | null => {
  if (!url) return null;
  const ipfsUrlMatch = url.match(EXTRACT_IPFS_HASH_REGEX);
  if (ipfsUrlMatch) {
    return ipfsUrlMatch[1];
  }
  return null;
};

export const formatNumberTkl = (number: number): string =>
  Intl.NumberFormat("en-US").format(number);

export const extractTokenMeta = (token: Token) => {
  const extractedIpfsHash =
    !!token.dataAsJson?.url && extractIPFSHash(token.dataAsJson.url);
  const transformedUrl = !!extractedIpfsHash
    ? `${DEFAULT_IPFS_FALLBACK_GATEWAY}/${extractedIpfsHash}`
    : token.dataAsJson?.url;
  const collectionName = token.dataAsJson?.arbitrary?.collection_name;

  const lastPrice = token.tokenDEX
    ?.filter((item) => item.funcid === "S" || item.funcid === "B")
    ?.sort((a, b) => b.blockHeight - a.blockHeight)?.[0]?.price;

  const lastAskingPrice = token.tokenDEX
    ?.filter((item) => item.funcid === "s")
    ?.sort((a, b) => b.blockHeight - a.blockHeight)?.[0]?.price;

  const lastBidPrice = token.tokenDEX
    ?.filter((item) => item.funcid === "b")
    ?.sort((a, b) => b.blockHeight - a.blockHeight)?.[0]?.price;

  const trimmedAuthorPublicKey = `${token.owner.substring(
    0,
    4
  )}...${token.owner.substring(token.owner.length - 4)}`;

  const trimmedDescription =
    !!token.description && token.description.length > 250
      ? `${token.description?.substring(0, 250)}...`
      : token.description;

  const authorIdenticon = new Identicon(token.owner, 50).toString();

  return {
    extractedIpfsHash,
    transformedUrl,
    collectionName,
    lastPrice,
    lastAskingPrice,
    lastBidPrice,
    trimmedDescription,
    trimmedAuthorPublicKey,
    authorIdenticon,
  };
};
