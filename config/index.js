const ELASTIC_SERVER = '167.99.114.240'
const TOKEL_SERVER = '167.99.114.240'

export const elasticConf = {
    maxPerPage: 30,
    server: ELASTIC_SERVER,
    port: '9200',
    localhost: 'localhost',
    cert: '/home/test/elasticsearch-8.2.2/config/certs/http_ca.crt',
    index:  'test-token-index-hexdata'
}

export const tokelConf = {
    rpchost: process.env.LOCAL_RUN ? 'localhost' : TOKEL_SERVER,
    rpcport: 29405,
    rpcuser: process.env.RPC_USER,
    rpcpassword: process.env.RPC_PASS
}
