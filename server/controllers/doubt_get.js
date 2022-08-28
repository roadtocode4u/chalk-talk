const Doubt = require("./../models/Doubt");
const User = require("./../models/User");
const TeachingAssistant = require("./../models/TeachingAssistant");

const doubtGet = async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.send([]);
  }

  const doubts = await Doubt.aggregate([
    {
      $match: {
        user: user._id,
      },
    },
    {
      $lookup: {
        from: "teachingassistants",
        localField: "teachingAssistant",
        foreignField: "_id",
        as: "teachingAssistant",
      },
    },
  ]);
  res.json(doubts);
};

module.exports = doubtGet;