// External Dependancies
const mongoose = require("mongoose");

const SnapshotSchema = new mongoose.Schema({
  beosAccounts: {
    type: [String],
    required: true
  },
  allBalances: [
    {
      account: {
        type: String,
        required: true
      },
      balance: {
        type: String,
        required: true
      },
      bts: {
        type: String,
        required: true
      }
    }
  ],
  beosBalances: [
    {
      account: {
        type: String,
        required: true
      },
      balance: {
        type: String,
        required: true
      }
    }
  ],
  btsBalances: [
    {
      account: {
        type: String,
        required: true
      },
      bts: {
        type: String,
        required: true
      }
    }
  ],
  beosDistributed: {
    type: Number,
    required: true
  },
  snapshotDate: {
    type: String,
    required: true
  },
  snapshotName: {
    type: String,
    required: true
  },
  numberAccounts: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Snapshot", SnapshotSchema);
