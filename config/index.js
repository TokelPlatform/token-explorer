export const elasticConf = {
    maxPerPage: 30,
    server: process.env.ELASTIC_SERVER,
    port: '9200',
    localhost: 'localhost',
    cert: '/home/test/elasticsearch-8.2.2/config/certs/http_ca.crt',
    index:  process.env.ELASTIC_INDEX
}

export const tokelConf = {
    rpchost: process.env.LOCAL_RUN ? 'localhost' : process.env.TOKEL_SERVER,
    rpcport: 29405,
    rpcuser: process.env.RPC_USER,
    rpcpassword: process.env.RPC_PASS
}
