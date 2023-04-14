import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected To Mongodb Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mognodb Database Error ${error}`);
  }
};

export default connectDB;
