import express from 'express';
import 'express-async-errors'; // Handles all async errors
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
  res.send('API is UP');
});

io.on('connection', () => {
  console.log('connect');
});

mongoose.connect(MONGO_URI).then(() => {
  console.log('connected to mongodb');
  httpServer.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
});
