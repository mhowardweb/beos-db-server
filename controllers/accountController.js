// External Dependancies
const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch");
const boom = require("@hapi/boom");

//BEOS endpoint address
const rpc = new JsonRpc("https://api.beos.world", { fetch });

// Get account
exports.getAccount = async req => {
  try {
    const id = req.id;
    const account = await rpc.get_account(id);
    return account;
  } catch (err) {
    throw boom.boomify(err);
  }
};
