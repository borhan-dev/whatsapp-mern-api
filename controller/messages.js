import Whatsapp from '../models/whatsapp.js';

export const newMessage = async(req,res) => {
    const message = req.body

    try {
        const data = await Whatsapp.create(message)
        res.status(200).json(data)
    }catch(err){res.status(500).json(err)}
}

export const getMessage =async(req, res) => {
    try {
        const data =  await Whatsapp.find()
        
        res.status(200).json(data)
    }catch(err){res.status(500).json(err)}
}