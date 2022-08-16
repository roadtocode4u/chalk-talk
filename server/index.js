const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const User = require('./models/User')
const Doubt = require('./models/Doubt');
const TeachingAssistant = require('./models/TeachingAssistant');
const { default: axios } = require('axios');
const getTAEmail = require('./utils/getTAEmail');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB 📦');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'All Good 👍'
  })
})

app.post('/user', async (req, res) => {
  const { fullName, email, mobile } = req.body

  if (!fullName) {
    return res.send({
      success: false,
      message: 'fullName cannot be empty'
    })
  }

  if (!email) {
    return res.send({
      success: false,
      message: 'email cannot be empty'
    })
  }

  if (!mobile) {
    return res.send({
      success: false,
      message: 'mobile cannot be empty'
    })
  }

  const user = await User.findOne({
    email: email,
  })

  if (user) {
    await User.updateOne({
      email: email,
    },
      {
        $set: {
          fullName: fullName,
          mobile: mobile,
        }
      })

    const updatedUser = await User.findOne({
      email: email,
    })

    res.send(updatedUser)
    return
  }

  const newUser = new User({
    fullName: fullName,
    email: email,
    mobile: mobile

  })

  const savedUser = await newUser.save();

  res.send(savedUser);
})

app.post("/doubt", async (req, res) => {
  const { title, description, courseName, slot, status, email } = req.body

  const user = await User.findOne({
    email
  })
  const TAEmail = getTAEmail(courseName);
  const teachingAssistant = await TeachingAssistant.findOne({
    email: TAEmail
  })

  const newDoubt = new Doubt({
    title,
    description,
    courseName,
    slot,
    status,
    user: user,
    teachingAssistant: teachingAssistant,
  })
  // TODO: send notification to slack channel
  
  const response = await axios.post("https://slack.com/api/chat.postMessage", {
    "channel": "C03N225P5FX",
    "text": `Hello *${teachingAssistant.fullName}*, New doubt is assigned to you.
*${user.fullName}* has asked *${title}*. Doubt Session with him is scheduled at *${slot}*. 
please call him now to inform about this session *${user.mobile}*.
More details are avilable in your dashboard. `
  }, {
    headers: {
      authorization: `Bearer ${process.env.AUTH_TOKEN}`
    }
  })

  const savedDoubt = await newDoubt.save();
  res.send(savedDoubt);
})

app.get('/doubts', async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({
    email: email
  })

  if(!user) {
    return res.send([])
  }

  const doubts = await Doubt.aggregate([
    {
      $match: {
        user: user._id
      }
    },
    {
    $lookup: {
      from: "teachingassistants",
      localField: "teachingAssistant",
      foreignField: "_id",
      as: "teachingAssistant"
    }
  }
  ]);
  res.json(doubts);
})


app.post("/assistant", async (req, res) => {
  const { fullName, email, mobile, password } = req.body

  const newTeachingAssistant = new TeachingAssistant({
    fullName,
    email,
    mobile,
    password
  })

  const savedTeachingAssistant = await newTeachingAssistant.save();
  res.send(savedTeachingAssistant);
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
