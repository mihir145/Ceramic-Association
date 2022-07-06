const Chat = require("../models/chat");

const router = require("express").Router();

router.post("/chat/sendMessage", (req, res) => {
  const { content, user, company } = req.body;

  Chat.insertOne({ content, user, company }, (err, chat) => {
    if (err) {
      return res.json({
        error: "Enable to send message!",
      });
    }
    return res.json({
      content,
      user,
      company,
    });
  });
});

module.exports = router;
