import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactBridgeComponent } from './react-bridge.component';

describe('ReactBridgeComponent', () => {
  let component: ReactBridgeComponent;
  let fixture: ComponentFixture<ReactBridgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactBridgeComponent]
    });
    fixture = TestBed.createComponent(ReactBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
