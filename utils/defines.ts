export const DEFAULT_IPFS_FALLBACK_GATEWAY = "https://ipfs.io/ipfs";
export const EXTRACT_IPFS_HASH_REGEX =
  /^(?:https:\/\/ipfs.io\/ipfs\/|ipfs:\/\/|dweb:\/\/)([a-zA-Z0-9]*$)/;

export const PATHS = {
  HOME: "/",
  TOKEN: (tokenId: string) => `/tokens/${tokenId}`,
  EXPLORE: "/explore",
}