import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat.message';
import * as SockJS from 'sockjs-client';
import { Stomp, StompHeaders } from '@stomp/stompjs';
import { UserService } from './user.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<
    ChatMessage[]
  >([]);

  constructor(private tokenService: TokenService) {
    this.initConnectionSocket();
  }
  initConnectionSocket() {
    // const url = `//localhost:8080/api/v1/chat-socket`;
    // const socket = new SockJS(url);
    // const authToken = this.tokenService.getToken();
    // const headers: StompHeaders = {
    //   Authorization: `Bearer ${authToken}`, // Thêm token vào header Authorization
    // };
    // this.stompClient = Stomp.over(socket);
    // this.stompClient.connect({headers, withCredentials: true}, () => {
    //   console.log('Connected to WebSocket');
    // });
  }

  joinRoom(roomId: string) {
    const authToken = this.tokenService.getToken();
    const headers: StompHeaders = {
      Authorization: `Bearer ${authToken}`, // Thêm token vào header Authorization
    };
    this.stompClient.connect({headers, withCredentials: true}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        const currentMessages = this.messageSubject.getValue();
        currentMessages.push(messageContent);
        this.messageSubject.next(currentMessages);
        console.log(messageContent);
      });
    });
  }
  sendMessage(roomId: string, chatMessage: ChatMessage) {
    const authToken = this.tokenService.getToken();
    const headers: StompHeaders = {
      Authorization: `Bearer ${authToken}`, // Thêm token vào header Authorization
    };
    this.stompClient.send(
      `/app/chat/${roomId}`,
      {headers, withCredentials: true},
      JSON.stringify(chatMessage)
    );
  }
  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
