export const DEFAULT_PER_PAGE = 9;
export const DEFAULT_IPFS_FALLBACK_GATEWAY = "https://ipfs.io/ipfs";
export const EXTRACT_IPFS_HASH_REGEX =
  /^(?:https:\/\/ipfs.io\/ipfs\/|ipfs:\/\/|dweb:\/\/)([a-zA-Z0-9]*$)/;

export const PATHS = {
  HOME: "/",
  TOKEN: (tokenId: string) => `/tokens/${tokenId}`,
  EXPLORE: (filters?: Record<string, string>) => `/explore?${new URLSearchParams(filters).toString()}`,
}

export const FILTERS = {
  TYPE: {
    NFT: "nft",
    FUNGIBLE_TOKEN: "fungible"
  },
  STATUS: {
    FOR_SALE: "for-sale",
    HAS_BID: "has-bid",
  }
}

export const HIGHLIGHTED_COLLECTIONS = [
  {
    name: "Crabbekyn Skulls",
    filterId: "crabbekyn-skulls",
    authorPb: "",
    collectionId: "",
  },
  {
    name: "Cyber Komodos",
    filterId: "cyber-komodos",
    authorPb: "",
    collectionId: "123",
  },
  {
    name: "Criptty",
    filterId: "criptty",
    authorPb: "",
    collectionId: "123",
  },
  {
    name: "Eye of the Komodo",
    filterId: "eye-of-the-komodo",
    authorPb: "",
    collectionId: "123",
  },
  {
    name: "UFO",
    filterId: "ufo",
    authorPb: "",
    collectionId: "123",
  },
];