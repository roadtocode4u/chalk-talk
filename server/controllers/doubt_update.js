const Doubt = require("./../models/Doubt");
const mongoose = require("mongoose");
const axios = require("axios")

const updateDoubt = async (req, res) => {
  const { doubtId, status } = req.body;
  const doubt = await Doubt.updateOne(
    {
      _id: mongoose.Types.ObjectId(doubtId),
    },
    {
      $set: {
        status: status,
      },
    }
  );
  res.send({
    success: true,
    message: `Doubt is marked as ${status}`,
  });
};

module.exports = updateDoubt;