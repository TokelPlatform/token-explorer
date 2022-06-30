const { Client } = require("@elastic/elasticsearch");

export const conf = {
  maxPerPage: 30,
  server: process.env.ELASTIC_SERVER,
  port: "9200",
  localhost: "localhost",
  cert: "/home/test/elasticsearch-8.2.2/config/certs/http_ca.crt",
  index: process.env.ELASTIC_INDEX,
};

export const elasticclient = new Client({
  // node: process.env.LOCAL_RUN ? 'https://localhost:9200' : 'https://167.99.114.240:9200',

  node: "https://".concat(
    process.env.ELASTIC_SERVER ? process.env.ELASTIC_SERVER : "localhost",
    ":",
    conf.port
  ),
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
  tls: {
    ca: conf.cert,
    rejectUnauthorized: false,
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});
