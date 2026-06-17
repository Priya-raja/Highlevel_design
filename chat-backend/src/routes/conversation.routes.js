import {Router} from 'express';
import {createConversation,getUserConversations,createOrGetDirectConversation} from '../controllers/conversation.controller.js';

const router = Router();

router.post('/', createConversation);
router.get("/user/:userId", getUserConversations);
router.post("/direct",createOrGetDirectConversation);
export default router;