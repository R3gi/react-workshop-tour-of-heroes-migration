import { AfterViewInit, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import React, { StrictMode } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { ReactRootComponent } from './react-root.component';

/**
 * Abstract class for React components to be used in Angular applications.
 * Implements the necessary lifecycle hooks and provides a method for rendering the component.
 *
 * Inherited component must have own @Component directive with template containing a selector of `react-root` component reference.
 * Styles and encapsulation: ViewEncapsulation.None must be defined in the @Component directive.
 * @example
  @Component({
  template: `<react-root id="component"></react-root>`,
  styleUrls: [ './dashboard.component.css' ],
  encapsulation: ViewEncapsulation.None,
})
 */
export abstract class AbstractReactComponent implements OnDestroy, AfterViewInit {
  @ViewChildren(ReactRootComponent, { read: ElementRef }) wrapperList!: QueryList<ElementRef>;
  roots!: Root[];

  ngOnDestroy() {
    this.roots.forEach((root) => root.unmount());
  }

  ngAfterViewInit(): void {
    this.roots = this.wrapperList.map((wrapper) => createRoot(wrapper.nativeElement));
    this.render();
  }

  private render() {
    this.roots.forEach((root) =>
      root.render(<StrictMode>
        {this.renderComponent()}
      </StrictMode>));
  }

  abstract renderComponent(): React.ReactElement;
}
