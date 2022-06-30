import { EXTRACT_IPFS_HASH_REGEX } from "./defines";

export const extractIPFSHash = (url: string): string | null => {
  if (!url) return null;
  const ipfsUrlMatch = url.match(EXTRACT_IPFS_HASH_REGEX);
  if (ipfsUrlMatch) {
    return ipfsUrlMatch[1];
  }
  return null;
};
