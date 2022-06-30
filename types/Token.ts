interface Token {
  IsMixed: "yes" | "no";
  created: number;
  data: string;
  dataAsJson: {
    id: number | string;
    royalty: number;
    url: string;
    arbitrary: Record<string, string | number>;
  };
  description: string;
  featured: boolean;
  height: number;
  name: string;
  owner: string;
  result: string;
  supply: number;
  tokenDEX: Array<any>;
  tokenid: string;
  updated: number;
  version: number;
}

export default Token;