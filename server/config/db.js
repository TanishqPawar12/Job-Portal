import mongoose from "mongoose";

//Function to connect to the database
const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log('Database connected'))
    mongoose.connection.on("error", (err) => console.log("MongoDB Error:", err));


    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB