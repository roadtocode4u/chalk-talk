const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const User = require('./models/User')

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

app.post('/register', async (req, res) => {
  const {fullName, email, mobile} = req.body
  
  if(!fullName)
  {
    return res.send({
      success: false,
      message: 'fullName cannot be empty'
    })
  }

  if(!email)
  {
    return res.send({
      success: false,
      message: 'email cannot be empty'
    })
  }

  if(!mobile)
  {
    return res.send({
      success: false,
      message: 'mobile cannot be empty'
    })
  }

  const user = await User.findOne({
    email: email,
  })
  
  if(user){
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
