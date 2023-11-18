import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractReactComponent } from './abstract-react.component';
import React from 'react';
import { Root } from 'react-dom/client';
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ReactRootComponent } from './react-root.component';

@Component({
  selector: 'component',
  template: `<react-root id="test"></react-root>`,
  encapsulation: ViewEncapsulation.None,
})
class ReactComponent extends AbstractReactComponent {
  constructor() {
    super();
  }

  renderComponent() {
    return React.createElement('p');
  }
}

describe('AbstractReactComponent', () => {
  let component: ReactComponent;
  let fixture: ComponentFixture<ReactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactComponent, ReactRootComponent]
    });
    fixture = TestBed.createComponent(ReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain roots', () => {
    expect(component.roots).toBeDefined();
  });

  it('should contain wrapperList with root element', () => {
    expect(component.wrapperList.first).toBeInstanceOf(ElementRef<Root>);
  });

  it('should call render', () => {
    for (const root of component.roots) {
      // TODO: toHaveBeenCalled test
      expect(root.render).toBeDefined();
    }
  });

  it('should call unmount', () => {
    for (const root of component.roots) {
      // TODO: toHaveBeenCalled test
      expect(root.unmount).toBeDefined();
    }
  });
});
