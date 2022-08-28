const Doubt = require("./../models/Doubt");
const User = require("./../models/User");
const TeachingAssistant = require("./../models/TeachingAssistant");
const axios = require("axios")

const TAEmailMap = {
  'icp': ['itspinki05@gmail.com', 'anandshirbhaiyye@gmail.com'],
  'c': ['itspinki05@gmail.com'],
  'cpp': ['itspinki05@gmail.com', 'prajaktadharpure28@gmail.com'],
  'python': ['sakoretejal1511@gmail.com', 'itspinki05@gmail.com'],
  "dsa": ['prajaktadharpure28@gmail.com', 'anandshirbhaiyye@gmail.com', 'yashdip123@gmail.com', 'itspinki05@gmail.com'],
};

const getTAEmail = (course) => {
  const TAMailArray = TAEmailMap[course]
  const randomIndex = Math.floor(Math.random() * TAMailArray.length)
  return TAMailArray[randomIndex]
}

const doubtPost = async (req, res) => {
  const { title, description, courseName, slot, status, email } = req.body;

  const user = await User.findOne({
    email,
  });
  // TODO: if pending doubt is already for user then return pending message

  const pendingDobuts = await Doubt.find({
    user: user,
    status: "pending",
  });

  if (pendingDobuts.length > 0) {
    return res.json({
      success: false,
      data: [],
      message: "You can ask new dobut once pending dobut is resovled",
    });
  }

  const TAEmail = getTAEmail(courseName);
  const teachingAssistant = await TeachingAssistant.findOne({
    email: TAEmail,
  });

  const newDoubt = new Doubt({
    title,
    description,
    courseName,
    slot,
    status,
    user: user,
    teachingAssistant: teachingAssistant,
  });
  // TODO: send notification to slack channel

  const response = await axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: "C03N225P5FX",
      text: `Hello *${teachingAssistant?.fullName || 'TA'}*, New doubt is assigned to you.
  *${user?.fullName || 'Student'}* has asked *${title}*. Doubt Session with him is scheduled at *${slot}*.
  please call him now to inform about this session *${user?.mobile || ''}*.
  More details are avilable in your dashboard. `,
    },
    {
      headers: {
        authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    }
  );

  const savedDoubt = await newDoubt.save();
  res.json({
    success: true,
    data: savedDoubt,
    message: "New doubt is added successfully",
  });
};

module.exports = doubtPost;
