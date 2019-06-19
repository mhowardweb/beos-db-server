// Import External Dependancies
const graphql = require("graphql");

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} = graphql;

// Import Controllers
const snapshotController = require("../controllers/snapshotController");
const accountController = require("../controllers/accountController");
const chainInfoController = require("../controllers/chainInfoController");

// Define Object Types
const snapshotType = new GraphQLObjectType({
  name: "Snapshot",
  fields: () => ({
    _id: { type: GraphQLID },
    beosAccounts: { type: new GraphQLList(GraphQLString) },
    allBalances: { type: new GraphQLList(balanceType) },
    beosBalances: { type: new GraphQLList(beosBalanceType) },
    btsBalances: { type: new GraphQLList(btsBalanceType) },
    beosDistributed: { type: GraphQLInt },
    snapshotDate: { type: GraphQLString },
    snapshotName: { type: GraphQLString },
    numberAccounts: { type: GraphQLInt }
  })
});

const balanceType = new GraphQLObjectType({
  name: "Balance",
  fields: () => ({
    _id: { type: GraphQLID },
    account: { type: GraphQLString },
    balance: { type: GraphQLString },
    bts: { type: GraphQLString }
  })
});

const beosBalanceType = new GraphQLObjectType({
  name: "BeosBalance",
  fields: () => ({
    _id: { type: GraphQLID },
    account: { type: GraphQLString },
    balance: { type: GraphQLString }
  })
});

const btsBalanceType = new GraphQLObjectType({
  name: "BtsBalance",
  fields: () => ({
    _id: { type: GraphQLID },
    account: { type: GraphQLString },
    bts: { type: GraphQLString }
  })
});

const networkType = new GraphQLObjectType({
  name: "Network",
  fields: () => ({
    used: { type: GraphQLInt },
    available: { type: GraphQLString },
    max: { type: GraphQLString }
  })
});

const permissionType = new GraphQLObjectType({
  name: "Permission",
  fields: () => ({
    perm_name: { type: GraphQLString },
    parent: { type: GraphQLString },
    required_auth: { type: new GraphQLList(GraphQLString) }
  })
});

const resourcesType = new GraphQLObjectType({
  name: "Resources",
  fields: () => ({
    owner: { type: GraphQLString },
    net_weight: { type: GraphQLString },
    cpu_weight: { type: GraphQLString },
    ram_bytes: { type: GraphQLInt }
  })
});

const bandwidthType = new GraphQLObjectType({
  name: "Bandwidth",
  fields: () => ({
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    net_weight: { type: GraphQLString },
    cpu_weight: { type: GraphQLString },
    refund_request: { type: GraphQLString }
  })
});

const voterType = new GraphQLObjectType({
  name: "Voter",
  fields: () => ({
    owner: { type: GraphQLString },
    proxy: { type: GraphQLString },
    producers: { type: new GraphQLList(GraphQLString) },
    staked: { type: GraphQLString },
    last_vote_weight: { type: GraphQLString },
    proxied_vote_weight: { type: GraphQLString },
    is_proxy: { type: GraphQLBoolean },
    reserved1: { type: GraphQLInt },
    reserved2: { type: GraphQLInt },
    reserved3: { type: GraphQLString }
  })
});

const accountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    account_name: { type: GraphQLString },
    head_block_num: { type: GraphQLInt },
    head_block_time: { type: GraphQLString },
    privileged: { type: GraphQLBoolean },
    last_code_update: { type: GraphQLString },
    created: { type: GraphQLString },
    ram_quota: { type: GraphQLString },
    net_weight: { type: GraphQLString },
    cpu_weight: { type: GraphQLString },
    net_limit: { type: networkType },
    cpu_limit: { type: networkType },
    ram_usage: { type: GraphQLInt },
    permissions: { type: new GraphQLList(permissionType) },
    total_resources: { type: resourcesType },
    self_delegated_bandwidth: { type: bandwidthType },
    voter_info: { type: voterType }
  })
});

const chainInfoType = new GraphQLObjectType({
  name: "ChainInfo",
  fields: () => ({
    server_version: { type: GraphQLString },
    chain_id: { type: GraphQLString },
    head_block_num: { type: GraphQLInt },
    last_irreversible_block_num: { type: GraphQLInt },
    last_irreversible_block_id: { type: GraphQLString },
    head_block_id: { type: GraphQLString },
    head_block_time: { type: GraphQLString },
    head_block_producer: { type: GraphQLString },
    virtual_block_cpu_limit: { type: GraphQLInt },
    virtual_block_net_limit: { type: GraphQLInt },
    block_cpu_limit: { type: GraphQLInt },
    block_net_limit: { type: GraphQLInt },
    server_version_string: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    snapshots: {
      type: new GraphQLList(snapshotType),
      async resolve(parent, args) {
        return await snapshotController.getSnapshots();
      }
    },
    snapshot: {
      type: snapshotType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await snapshotController.getSnapshot(args);
      }
    },
    account: {
      type: accountType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await accountController.getAccount(args);
      }
    },
    chainInfo: {
      type: chainInfoType,
      async resolve(parent, args) {
        return await chainInfoController.getChainInfo();
      }
    }
  }
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
