const TeachingAssistant = require("./../models/TeachingAssistant");

const assistantGet = async (req, res) => {
  const { email, token } = req.query;
  const teachingAssistant = await TeachingAssistant.findOne({
    email: email,
    token: token,
  });
  res.send({
    success: teachingAssistant ? true : false,
    data: teachingAssistant,
  });
};

module.exports = assistantGet;