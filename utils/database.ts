import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    
    if(isConnected) {
        console.log('MongoDB is already connected')
        return
    }
    console.log(process.env.MONGODB_URI as string)
    try {
        
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log("MongoDb connected")
    } catch (error) {
        console.log(error)
    }
}