const User = require('../models/userModel');
const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Example: Send a new message
const processAndSaveMessage = catchAsync(async (messageData) => {
  const { senderId, receiverId, content } = req.body;

  // Check if both sender and receiver exist
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    return res.status(404).json({ message: 'Sender or receiver not found' });
  }

  // Create a new message
  const message = new Message({
    sender: senderId,
    receiver: receiverId,
    content,
  });

  // Save the message to the database
  await message.save();

  // Respond with the saved message
  return res.status(201).json(message);
});
