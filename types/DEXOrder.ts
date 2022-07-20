interface DEXOrder {
  funcid: "s" | "B" | "S" | "b";
  txid: string;
  askamount?: number;
  bidamount?: number;
  origaddress: string;
  origtokenaddress: string;
  tokenid: string;
  totalrequired: number;
  blockHeight: number;
  price: number;
  ExpiryHeight: number;
}

export default DEXOrder;
