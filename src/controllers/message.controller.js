const { HttpStatus, Messages } = require("../constants");
const messageModel = require("../models/message.model");

exports.scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    if (!message || !day || !time) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing parameters" });
    }

    const scheduledDate = new Date(`${day}T${time}`);

    const saveData = await messageModel.create({
      message,
      scheduledAt: scheduledDate,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Message scheduled",
      data: saveData,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: Messages.INTERNAL_ERROR });
  }
};
