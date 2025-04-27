import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ cors:true })
export class VotesGateway { @WebSocketServer() server: Server; }