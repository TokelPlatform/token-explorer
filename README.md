# Tokel's Token Explorer

This repo contains the code to run a token-specific web explorer with [Tokel](https://tokel.io)-compatible chains as data sources.

Blockchain data is stored in Elastic Search Store.

When deploying the server you have to manually create `.env.local` file in root of the project and populate the following vars.

```
LOCAL_RUN=1
ELASTIC_USER=xxx
ELASTIC_PASS=xxx
ELASTIC_PORT=xxx
RPC_USER=xxx
RPC_PASS=xxx
ELASTIC_SERVER=xxx
TOKEL_SERVER=xxx
```
