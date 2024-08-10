import { Component } from '@angular/core';
import { FlashMessageService } from 'src/app/flash-message.service';

@Component({
  selector: 'app-flash-message',
  template: `
    <div *ngFor="let message of messages" class="flash-message">
      {{ message }}
    </div>
  `,
  styles: [`
    .flash-message {
      padding: 10px;
      background-color: #4CAF50; /* Green background */
      color: white; /* White text */
      margin-bottom: 15px;
      animation: fadeOut 5s forwards; /* Auto-close after 5 seconds */
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
      }
    }
  `],
})
export class FlashMessageComponent {
  messages: string[] = [];

  constructor(private flashMessageService: FlashMessageService) {}

  ngOnInit(): void {
    this.flashMessageService.getMessages();
  }
}
