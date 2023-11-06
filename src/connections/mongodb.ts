import mongoose from 'mongoose';

export const connectToMongodb = async (connectionURI: string) => {
  try {
    // await mongoose.connect("mongodb://orders-mongo-srv:27017/orders");
    await mongoose.connect(connectionURI);
    console.log('LMS Service: Connected to MongoDb');
  } catch (err) {
    console.log('Cannot connect to MongoDb for LMS System');
    // console.error(err);
  }
};
