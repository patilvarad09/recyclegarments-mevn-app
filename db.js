import mongoose from 'mongoose'

const connectDB = () => {
        mongoose.connect("mongodb://127.0.0.1:27017/RecycleGarments", () => {
                console.log("Connection Established");
        }) 
    }

connectDB();

export default connectDB;