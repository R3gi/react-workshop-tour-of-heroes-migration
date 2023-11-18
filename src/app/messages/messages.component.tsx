import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService } from '../message.service';
import { AbstractReactComponent } from '../react-root/abstract-react.component';
import { ReactElement, JSXElementConstructor } from 'react';
import { Messages } from './react/Messages';
import React from 'react';
import { Subject, forkJoin, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  template: `<react-root id="messages"></react-root>`,
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesComponent extends AbstractReactComponent {
  constructor(public messageService: MessageService) {
    super();
  }

  getMessages = () => {
    return this.messageService.replayMessages;
  }

  clear = () => {
    this.messageService.clear();
  }

  renderComponent(): ReactElement<any, string | JSXElementConstructor<any>> {
    return <Messages clear={this.clear} messages={this.getMessages()} />
  }
}
