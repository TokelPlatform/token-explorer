export const DEFAULT_PER_PAGE = 9;
export const DEFAULT_IPFS_FALLBACK_GATEWAY = "https://exploretokel.com/ipfs";
export const EXTRACT_IPFS_HASH_REGEX =
  /^(?:https:\/\/ipfs.io\/ipfs\/|ipfs:\/\/|dweb:\/\/)([a-zA-Z0-9]*$)/;

export const PATHS = {
  HOME: "/",
  TOKEN: (tokenId: string) => `/tokens/${tokenId}`,
  EXPLORE: (filters?: Record<string, string>) =>
    !!filters
      ? `/explore${new URLSearchParams(filters).toString()}`
      : "/explore",
};

export const FILTERS = {
  TYPE: {
    NFT: "nft",
    FUNGIBLE_TOKEN: "fungible",
  },
  STATUS: {
    FOR_SALE: "for-sale",
    HAS_BID: "has-bid",
  },
};

export const HIGHLIGHTED_COLLECTIONS = [
  {
    label: "Cyber Komodos",
    filterId: "cyber-komodos",
    authorPb:
      "02ffb8284fc51e62ab25d1549adb9b1fb7731d103d7c2f2ab2d0344919eefccb8a",
    collectionId: 77777,
    collectionName: "cyber komodos",
  },
  {
    label: "Crabbekyn Skulls",
    filterId: "crabbekyn-skulls",
    authorPb:
      "03970add343176a3b37a2baac895449322fd2ec5164baa14a7fcabaf2c630de628",
    collectionId: 634254,
    collectionName: "Crabbekyn Skulls",
  },
  {
    label: "Crabbekyn's zs Skulls",
    filterId: "crabbekyn-zs-skulls",
    authorPb:
      "03970add343176a3b37a2baac895449322fd2ec5164baa14a7fcabaf2c630de628",
    collectionId: 960071,
    collectionName: "zs Skulls",
  },
  {
    label: "Criptty",
    filterId: "criptty",
    authorPb:
      "039e3529d203bee94a41e0be8c369fb6d38a8afdc35a25f697569a715813973528",
  },
  {
    label: "Eye of the Komodo",
    filterId: "eye-of-the-komodo",
    authorPb:
      "02490874d1d681883b6c585341ce597882fe0bdc806d072faac843296e0d22d7a4",
    collectionId: 257927,
    collectionName: "Eye of the Komodo",
  },
  {
    label: "UFO",
    filterId: "ufo",
    authorPb:
      "025e470c089fb8838c93c4dc90c5a1a5ec2dcc9f336cfd62e4f6c387928ca16948",
    collectionId: 51114,
    collectionName: "UFO",
  },
];
