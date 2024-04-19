// utils/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ujjwalrob11:lRc2onBpO8Tytlp9@cluster121.ivitxhc.mongodb.net/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the deprecated options
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
