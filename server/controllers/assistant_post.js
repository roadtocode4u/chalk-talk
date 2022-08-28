const TeachingAssistant = require("./../models/TeachingAssistant");

const assistantPost = async (req, res) => {
  const { fullName, email, mobile, token } = req.body

  const newTeachingAssistant = new TeachingAssistant({
    fullName,
    email,
    mobile,
    token,
  });

  const savedTeachingAssistant = await newTeachingAssistant.save();
  res.send(savedTeachingAssistant);
};

module.exports = assistantPost;