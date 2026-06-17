import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";


export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content, receiverId } = req.body;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });

    await message.populate("senderId", "username");

    conversation.lastMessage = message._id;
    await conversation.save();

    const io = req.app.get("io");

    if (receiverId) {
      io.to(receiverId).emit("new-message", message);
    }

    res.status(201).json(message);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;


    const messages = await Message.find({
      conversationId,
    })
      .populate("senderId", "username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalMessages = await Message.countDocuments({
      conversationId,
    });

    res.json({
      page,
      limit,
      totalMessages,
      totalPages: Math.ceil(
        totalMessages / limit
      ),
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessagesCursor = async(req,res) => {
  try {
    const {conversationId} = req.params;
    const {cursor} = req.query;

    const query = {
      conversationId,
    };

    if (cursor){
      query.createdAt ={
        $lt: new Date(cursor),
      };
    }
    const messages = await Message.find(query)
      .populate("senderId", "username")
      .sort({ createdAt: -1 })
      .limit(20);

    const nextCursor =
      messages.length > 0
        ? messages[messages.length - 1].createdAt
        : null; 

    res.json({
      messages,
      nextCursor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }  
};
