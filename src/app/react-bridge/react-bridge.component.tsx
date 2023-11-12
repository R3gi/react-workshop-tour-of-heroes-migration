import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../react/App';

@Component({
  selector: 'app-react-bridge',
  templateUrl: './react-bridge.component.html',
  styleUrls: ['./react-bridge.component.css']
})
export class ReactBridgeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: false })
  wrapper: ElementRef<HTMLDivElement> | undefined;
  constructor(private route: ActivatedRoute) {}
  ngAfterViewInit() {
    this.render();
  }
  ngOnDestroy() {
    if (this.wrapper && this.wrapper.nativeElement) {
      const root = createRoot(this.wrapper.nativeElement);

      root.unmount();
    }
  }
  render() {
    if (this.wrapper && this.wrapper.nativeElement) {
      const root = createRoot(this.wrapper.nativeElement);

      root.render(
        <StrictMode>
          <App id={this.route.snapshot.queryParams['id'] || ''} />
        </StrictMode>
      );
    }
  }
}
