const tokelConf = {
  rpchost: process.env.LOCAL_RUN ? "127.0.0.1" : process.env.TOKEL_SERVER,
  rpcport: 29405,
  rpcuser: process.env.RPC_USER,
  rpcpassword: process.env.RPC_PASS,
};

const SmartChain = require("komodo-rpc-js");

const tokel = new SmartChain({ config: tokelConf });
const tokelRPC = tokel.rpc();

module.exports = {
  tokelRPC,
  tokelConf
}