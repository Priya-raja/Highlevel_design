import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res) => {
    try {
        const {participants} = req.body;

        const conversation = await Conversation.create({
            participants,
        });
        console.log(req.body);
        console.log(typeof req.body.participants);
        res.status(201).json(conversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ 
            message: error.message,
        });
    }
};

export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "username email")
      .populate("lastMessage");

    res.json(conversations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};