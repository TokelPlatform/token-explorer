const { Client } = require("@elastic/elasticsearch");

const conf = {
  maxPerPage: 30,
  server: process.env.ELASTIC_SERVER || "",
  port: process.env.ELASTIC_PORT || "9200",
  localhost: "127.0.0.1",
  cert: "/home/test/elasticsearch-8.2.2/config/certs/http_ca.crt",
  index: process.env.ELASTIC_INDEX,
};

const server = process.env.LOCAL_RUN ? conf.localhost : conf.server;

const elasticclient = new Client({
  node: "https://".concat(server, ":", conf.port),
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


module.exports = {
  elasticclient,
  conf
}