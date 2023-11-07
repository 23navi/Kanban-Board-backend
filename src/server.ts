import express from 'express';
import 'express-async-errors'; // Handles all async errors
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import { MONGO_URI, PORT, NODE_ENV } from './config';
import { connectToMongodb } from './connections/mongodb';
import errorHandler from './middlewares/error-handler';
import routes from './routes';
import { deleteExpiredSession, testCron } from './corns';
import deserializeUser from './middlewares/deserialize-user';
import SocketEventsEnum from './utils/socket.enum';
import { joinBoard, leaveBoard } from './controllers/sockets/board.socket.controller';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);

app.get('/', (req, res) => {
  res.send('API is UP');
});

app.use(routes);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('connect');
  socket.on(SocketEventsEnum.boardsJoin, (data) => {
    joinBoard(io, socket, data);
  });
  socket.on(SocketEventsEnum.boardsLeave, (data) => {
    leaveBoard(io, socket, data);
  });
});

app.listen(PORT, () => {
  connectToMongodb(MONGO_URI);
  console.info(`Server: Listening on port ${PORT} in ${NODE_ENV} mode`);
  console.info({ app_version: process.env.npm_package_version });
});

// Running cron jobs
deleteExpiredSession();
// testCron();
