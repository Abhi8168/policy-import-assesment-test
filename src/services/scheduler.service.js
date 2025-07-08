const cron = require("node-cron");
const Message = require("../models/message.model");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const messages = await Message.find({
    scheduledAt: { $lte: now },
  });

  messages.forEach((msg) => {
    console.log(`[Message Triggered]: ${msg.message}`);
    // Optionally send email / notification here
  });

  // Remove old messages (optional)
  await Message.deleteMany({ scheduledAt: { $lte: now } });
});
