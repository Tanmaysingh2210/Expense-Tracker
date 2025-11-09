import mongoose from 'mongoose';

const connectDb = async () => {
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(()=> console.log('Mongodb connection established sucessfully'))
            .catch((err)=> console.log('Mongodb connection Error:' , err));
    
}

export default connectDb;