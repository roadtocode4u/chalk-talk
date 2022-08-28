const healthCheck = (req, res) => {
  res.json({
    status: "All Good 👍",
  });
}

module.exports = healthCheck;