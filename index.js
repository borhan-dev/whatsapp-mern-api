import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import router from './routes/index.js'

const app = express()
app.use(cors())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({extended:true}))
dotenv.config()

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
        console.log(`Connected On PORT: ${process.env.PORT}`)
    })
    }).catch(err => console.error(err))


    //pusher
 const pusher = new Pusher({
  appId: "1278826",
  key: "a70763a08dc64edb87ae",
  secret: "d266ea49148508d04251",
  cluster: "ap1",
  useTLS: true
 });

const db = mongoose.connection
 
db.once('open', () => {
    console.log("Connected")
    const msgCollection = db.collection('messagecontents');

    const changeStream = msgCollection.watch()
    
    changeStream.on('change', (change) => {
        console.log("A change Ocured", change)
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
              name: messageDetails.name,
              message: messageDetails.message,
              timestamps: messageDetails.timestamps,
              received: messageDetails.received,
              id: messageDetails._id
            });
        } else {
            console.log('Error Trigerring Pusher')
        }
    })
})



    //Routes

    app.use('/api/v1/messages',router)