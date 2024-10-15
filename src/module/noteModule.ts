import mongoose from 'mongoose';  

const noteSchema = new mongoose.Schema({  
    history:[{
        title: { type: String, required: true },  
        content: { type: String, required: false },  
        date:{type: Date, default: Date.now},
    }],
    tags: { type:Array },
    inlink: { type:Array },
    outlink: { type:Array },
});  

const noteModel = mongoose.model('note_vault', noteSchema);  
export default noteModel;
