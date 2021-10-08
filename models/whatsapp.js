import mongoose from 'mongoose'

const whatsappSchema = new mongoose.Schema({
    name: String,
    message: String,
    timestamps: String,
    received:false
})

const Whatsapp = mongoose.model('messageContent', whatsappSchema)
export default Whatsapp