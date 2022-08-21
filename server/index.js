
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const Doubt = require("./models/Doubt");
const TeachingAssistant = require("./models/TeachingAssistant");
const { default: axios } = require("axios");
const getTAEmail = require("./utils/getTAEmail");
const { response } = require("express");


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB 📦");
  }
);

app.get("/health", (req, res) => {
  res.json({
    status: "All Good 👍",
  });
});

app.post("/user", async (req, res) => {
  const { fullName, email, mobile } = req.body;

  if (!fullName) {
    return res.send({
      success: false,
      message: "fullName cannot be empty",
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: "email cannot be empty",
    });
  }

  if (!mobile) {
    return res.send({
      success: false,
      message: "mobile cannot be empty",
    });
  }

  const user = await User.findOne({
    email: email,
  });

  if (user) {
    await User.updateOne(
      {
        email: email,
      },
      {
        $set: {
          fullName: fullName,
          mobile: mobile,
        },
      }
    );

    const updatedUser = await User.findOne({
      email: email,
    });

    res.send(updatedUser);
    return;
  }

  const newUser = new User({
    fullName: fullName,
    email: email,
    mobile: mobile,
  });

  const savedUser = await newUser.save();

  res.send(savedUser);
});

app.post("/doubt", async (req, res) => {
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
      text: `Hello *${teachingAssistant.fullName}*, New doubt is assigned to you.
*${user.fullName}* has asked *${title}*. Doubt Session with him is scheduled at *${slot}*. 
please call him now to inform about this session *${user.mobile}*.
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
});

app.get("/doubts", async (req, res) => {
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
});

app.get("/doubtsforta/:email", async (req, res) => {
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
      "$addFields" : {
         "__order" : { "$indexOfArray" : [ doubtStatuses, "$status" ] }
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
});

app.get('/doubtsforta/:email', async (req, res) => {
 const {email}= req.params;
 
 const teachingAssistant = await TeachingAssistant.findOne({
    email: email
 })

  if(!teachingAssistant) {
    return res.send([])
  }
  
  const doubts = await Doubt.find({
    teachingAssistant: teachingAssistant
  })
  res.send(doubts);
})

app.post("/assistant", async (req, res) => {
  const { fullName, email, mobile, token } = req.body

  const newTeachingAssistant = new TeachingAssistant({
    fullName,
    email,
    mobile,
    token,
  });

  const savedTeachingAssistant = await newTeachingAssistant.save();
  res.send(savedTeachingAssistant);
});

app.get("/assistants", async (req, res) => {
  const { email, token } = req.query;
  const teachingAssistant = await TeachingAssistant.findOne({
    email: email,
    token: token,
  });
  res.send({
    success: teachingAssistant ? true : false,
    data: teachingAssistant,
  });
});

app.post("/updatedoubt", async (req, res) => {
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
});

app.get('/assistants', async (req, res) => {
  const {email, token} = req.query;
  const teachingAssistant = await TeachingAssistant.findOne({
    email: email,
    token: token
  });
  res.send({
    success: teachingAssistant ? true : false,
    data: teachingAssistant
  })
})

if (process.env.NODE_ENV ==='production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
