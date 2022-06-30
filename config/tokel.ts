export const tokelConf = {
  rpchost: process.env.LOCAL_RUN ? "localhost" : process.env.TOKEL_SERVER,
  rpcport: 29405,
  rpcuser: process.env.RPC_USER,
  rpcpassword: process.env.RPC_PASS,
};

const SmartChain = require("komodo-rpc-js");

const tokel = new SmartChain(tokelConf);
export const tokelRPC = tokel.rpc();
