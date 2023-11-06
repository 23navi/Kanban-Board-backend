import express from 'express';
import 'express-async-errors'; // Handles all async errors
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import { MONGO_URI, PORT, NODE_ENV } from './config';
import { connectToMongodb } from './connections/mongodb';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is UP');
});

app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'available',
    systemInfo: {
      env: process.env.NODE_ENV,

      version: process.env.npm_package_version,
    },
  });
});

app.use(errorHandler);

io.on('connection', () => {
  console.log('connect');
});

app.listen(PORT, () => {
  connectToMongodb(MONGO_URI);
  console.info(`Server: Listening on port ${PORT} in ${NODE_ENV} mode`);
  console.info({ app_version: process.env.npm_package_version });
});
