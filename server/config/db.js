import mongoose from 'mongoose';

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to Mongo DB Database`.bgMagenta.white);
    
  }catch(error){
    console.log(`MONGO Connect Error`.bgRed.white);
  }
}

export default connectDB;