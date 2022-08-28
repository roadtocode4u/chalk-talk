const User = require("./../models/User");

const userPost = async (req, res) => {
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
};

module.exports = userPost;
