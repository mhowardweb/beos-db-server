// External Dependancies
const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch");
const boom = require("@hapi/boom");

//BEOS endpoint address
const rpc = new JsonRpc("https://api.beos.world", { fetch });

// Get account
exports.getChainInfo = async () => {
  try {
    const chainInfo = await rpc.get_info();
    return chainInfo;
  } catch (err) {
    throw boom.boomify(err);
  }
};
