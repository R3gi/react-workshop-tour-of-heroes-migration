import { Component, Input } from '@angular/core';

@Component({
  selector: 'react-root'
})
export class ReactRootComponent {
  @Input() id!: string;
}
