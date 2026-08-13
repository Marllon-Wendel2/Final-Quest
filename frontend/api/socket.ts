import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io({
      withCredentials: true,         
      autoConnect: true,             
      reconnection: true,            
      reconnectionAttempts: 10,      
      reconnectionDelay: 1000,       
      reconnectionDelayMax: 5000,    
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('[Socket] Conectado:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Desconectado:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Erro de conexão:', error.message);
    });
  }

  return socket;
}