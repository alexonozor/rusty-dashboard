import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ChatMessage {
  id: number;
  sender: 'user' | 'support';
  message: string;
  timestamp: Date;
  avatar?: string;
}

@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="chat-dialog-container">
      <!-- Header -->
      <div class="chat-header">
        <div class="flex items-center gap-2">
          <img src="https://ui-avatars.com/api/?name=Support+Team&background=10b981&color=fff" alt="Support" class="w-10 h-10 rounded-full">
          <div>
            <p class="font-semibold text-sm">Support Team</p>
            <p class="text-xs text-green-600 dark:text-green-400">Online</p>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages" #messagesContainer>
        @for (msg of messages(); track msg.id) {
          <div [class.message-user]="msg.sender === 'user'" [class.message-support]="msg.sender === 'support'" class="message-group">
            @if (msg.sender === 'support') {
              <img [src]="msg.avatar" [alt]="msg.sender" class="message-avatar">
            }
            <div [class.user-bubble]="msg.sender === 'user'" [class.support-bubble]="msg.sender === 'support'" class="message-bubble">
              <p>{{ msg.message }}</p>
              <span class="message-time">{{ msg.timestamp | date: 'short' }}</span>
            </div>
          </div>
        }
      </div>

      <!-- Input -->
      <div class="chat-input-area">
        <mat-form-field class="w-full" appearance="outline">
          <mat-label>Type a message...</mat-label>
          <input matInput [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" placeholder="Type your message here">
          <button mat-icon-button matSuffix (click)="sendMessage()" [disabled]="!newMessage.trim()" class="send-button">
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
      </div>
    </div>
  `,
  styles: [`
    .chat-dialog-container {
      display: flex;
      flex-direction: column;
      height: 500px;
      max-height: 80vh;
      width: 100%;
      max-width: 500px;
      background: var(--mat-sys-surface);
      border-radius: 12px;
      overflow: hidden;
    }

    .chat-header {
      padding: 16px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-dim);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--mat-sys-surface);
    }

    .chat-messages::-webkit-scrollbar {
      width: 6px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: var(--mat-sys-outline-variant);
      border-radius: 3px;
    }

    .message-group {
      display: flex;
      gap: 8px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message-user {
      justify-content: flex-end;
    }

    .message-support {
      justify-content: flex-start;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .message-bubble {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 12px;
      line-height: 1.4;
      word-break: break-word;
    }

    .user-bubble {
      background: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
      border-bottom-right-radius: 4px;
    }

    .support-bubble {
      background: var(--mat-sys-surface-container);
      color: var(--mat-sys-on-surface);
      border-bottom-left-radius: 4px;
      border: 1px solid var(--mat-sys-outline-variant);
    }

    .message-bubble p {
      margin: 0;
      font-size: 14px;
    }

    .message-time {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 4px;
      display: block;
    }

    .chat-input-area {
      padding: 12px 16px;
      border-top: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface);
    }

    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-button:not(:disabled) {
      cursor: pointer;
      color: var(--mat-sys-primary);
    }

    ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;
      }

      .mat-mdc-form-field-label {
        color: var(--mat-sys-on-surface-variant) !important;
      }

      .mat-mdc-form-field-ripple {
        background-color: var(--mat-sys-primary) !important;
      }
    }
  `]
})
export class ChatDialogComponent {
  messages = signal<ChatMessage[]>([
    {
      id: 1,
      sender: 'support',
      message: 'Hello! 👋 How can we help you today?',
      timestamp: new Date(Date.now() - 5 * 60000),
      avatar: 'https://ui-avatars.com/api/?name=Support+Team&background=10b981&color=fff'
    },
    {
      id: 2,
      sender: 'user',
      message: 'Hi, I have a question about my account settings.',
      timestamp: new Date(Date.now() - 4 * 60000)
    },
    {
      id: 3,
      sender: 'support',
      message: 'Of course! I\'d be happy to help. What specifically would you like to know?',
      timestamp: new Date(Date.now() - 3 * 60000),
      avatar: 'https://ui-avatars.com/api/?name=Support+Team&background=10b981&color=fff'
    },
    {
      id: 4,
      sender: 'user',
      message: 'How do I update my profile information?',
      timestamp: new Date(Date.now() - 2 * 60000)
    },
    {
      id: 5,
      sender: 'support',
      message: 'You can update your profile by going to Settings > Profile. There you\'ll find all the options to edit your information. Let me know if you need more help! 😊',
      timestamp: new Date(Date.now() - 1 * 60000),
      avatar: 'https://ui-avatars.com/api/?name=Support+Team&background=10b981&color=fff'
    }
  ]);

  newMessage = '';
  private messageId = 6;

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    // Add user message
    this.messages.update(msgs => [
      ...msgs,
      {
        id: this.messageId++,
        sender: 'user',
        message: this.newMessage,
        timestamp: new Date()
      }
    ]);

    const userMsg = this.newMessage;
    this.newMessage = '';

    // Simulate support response after a short delay
    setTimeout(() => {
      this.messages.update(msgs => [
        ...msgs,
        {
          id: this.messageId++,
          sender: 'support',
          message: this.generateResponse(userMsg),
          timestamp: new Date(),
          avatar: 'https://ui-avatars.com/api/?name=Support+Team&background=10b981&color=fff'
        }
      ]);
      this.scrollToBottom();
    }, 800);

    this.scrollToBottom();
  }

  private generateResponse(userMessage: string): string {
    const responses = [
      'That\'s a great question! Let me help you with that.',
      'I understand. Let me provide you with more information.',
      'Thanks for asking! Here\'s what you need to know:',
      'No problem! I\'m here to help with that.',
      'That\'s helpful to know. Let me assist you further.',
      'Great! I can definitely help you with this.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messagesDiv = document.querySelector('.chat-messages');
      if (messagesDiv) {
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }
    }, 0);
  }
}
