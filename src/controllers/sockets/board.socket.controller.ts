import { Server, Socket } from 'socket.io';
export const joinBoard = (io: Server, socket: Socket, data: { boardId: string }) => {
  console.log('server socket io join', data.boardId);
  socket.join(data.boardId);
};

export const leaveBoard = (io: Server, socket: Socket, data: { boardId: string }) => {
  console.log('server socket io leave', data.boardId);
  socket.leave(data.boardId);
};
