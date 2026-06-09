import {Router} from 'express';
import {sendMessage,getMessages,getMessagesCursor} from "../controllers/message.controller.js";

const router = Router();

router.post("/", sendMessage);  
router.get("/cursor/:conversationId",getMessagesCursor);
router.get("/:conversationId", getMessages);

export default router;
