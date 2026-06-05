import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type: mongoose.Schema.Types.ObjectId,,
            ref:'Conversation',
            required:true,
        },
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        content:{
            type:String,
            required:true,
        },

        status:{
            type:String,
            enum:['sent','delivered','read'],
            default:'sent', 
        },

    },
    {
        timestamps:true,
    }
);

export default mongoose.model(
    "Message",
    messageSchema
);

messageSchema.index({
    conversationId:1,
    createdAt:-1,
});