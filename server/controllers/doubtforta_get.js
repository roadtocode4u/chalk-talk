const Doubt = require("./../models/Doubt");
const TeachingAssistant = require("./../models/TeachingAssistant");

const doubtForTA = async (req, res) => {
    const { email } = req.params;

    const teachingAssistant = await TeachingAssistant.findOne({
        email: email,
    });

    if (!teachingAssistant) {
        return res.send([]);
    }
    const doubtStatuses = ["pending", "attended", "resolved"]

    const doubts = await Doubt.aggregate([
        {
            $match: {
                teachingAssistant: teachingAssistant._id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            "$addFields": {
                "__order": { "$indexOfArray": [doubtStatuses, "$status"] }
            }

        },
        {
            $unwind: "$user",
        },
        {
            $sort: {
                __order: 1,
            }
        }
    ]);

    res.send(doubts);
};

module.exports = doubtForTA;