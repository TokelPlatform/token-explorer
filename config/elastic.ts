const { Client } = require('@elastic/elasticsearch')
// const SmartChain = require ("komodo-rpc-js");

import { elasticConf } from ".";

export const elasticclient = new Client({
    // node: process.env.LOCAL_RUN ? 'https://localhost:9200' : 'https://167.99.114.240:9200', 

    node: 'https://'.concat(process.env.ELASTIC_SERVER ? process.env.ELASTIC_SERVER : 'localhost', ':', elasticConf.port),
    auth: {
      username: process.env.ELASTIC_USER,
      password: process.env.ELASTIC_PASS
    },
    tls: {
      ca: elasticConf.cert,
      rejectUnauthorized: false
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true
})

// const tokel = new SmartChain(tokelConf);
// export const tokelRPC = tokel.rpc();
