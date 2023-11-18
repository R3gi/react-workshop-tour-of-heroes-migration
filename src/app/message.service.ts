import { Injectable } from '@angular/core';
import { ReplaySubject, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  replayMessages: ReplaySubject<string> = new ReplaySubject();

  add(message: string) {
    this.messages.push(message);
    this.replayMessages.next(message);
  }

  clear() {
    this.messages = [];
    this.replayMessages.pipe(startWith([]));
  }
}
