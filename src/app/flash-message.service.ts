import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  constructor() { }
  
  static messages: string[]=[];
  

  addMessage(message: string): void {
    FlashMessageService.messages=[];
    FlashMessageService.messages.push(message);
    // FlashMessageService.messages.push(message);
  }

  getMessages(){
    return FlashMessageService.messages;
  }

  clearMessages(): void {
    FlashMessageService.messages = [];
  }
  
}
