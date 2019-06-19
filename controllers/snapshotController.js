// External Dependancies
const boom = require("@hapi/boom");

// Get Data Models
const Snapshot = require("../models/Snapshot");

// Get all snapshots
exports.getSnapshots = async () => {
  try {
    const snapshots = await Snapshot.find({}).sort({ snapshotDate: "desc" });
    return snapshots;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single snapshot by ID
exports.getSnapshot = async req => {
  try {
    const id = req.id;
    const snapshot = await Snapshot.findById(id);
    return snapshot;
  } catch (err) {
    throw boom.boomify(err);
  }
};
