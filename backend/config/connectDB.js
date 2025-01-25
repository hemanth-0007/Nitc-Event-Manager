import mongoose from 'mongoose';

export const  connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch (error) {
        console.error(`Error connecting to the database ${error.message}`);
        process.exit(1);
    }
}