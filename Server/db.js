import mongoose from 'mongoose';

const connectDb = async () => {
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri);
    console.log('Mongodb connection established successfully');
}

export default connectDb;