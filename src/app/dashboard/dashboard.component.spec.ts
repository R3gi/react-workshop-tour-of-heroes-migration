import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Observable, of} from 'rxjs';

import {HeroSearchComponent} from '../hero-search/hero-search.component';
import {HeroService} from '../hero.service';
import {HEROES} from '../mock-heroes';

import {DashboardComponent} from './dashboard.component';
import { ReactRootComponent } from '../react-root/react-root.component';
import { Dashboard } from './react/Dashboard';
import React from 'react';
import { Hero } from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: { getHeroes: { (): Observable<Hero[]>; (): Observable<Hero[]>; and: any; }; };
  let getHeroesSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, HeroSearchComponent, ReactRootComponent],
          imports: [RouterModule.forRoot([])],
          providers: [
            {provide: HeroService, useValue: heroService},
          ]
        })
        .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call renderComponent', () => {
    expect(component.renderComponent()).toEqual(React.createElement(Dashboard, { heroes$: heroService.getHeroes() }));
  });

  it('should call heroService', waitForAsync(() => {
       expect(getHeroesSpy.calls.any()).toBe(true);
  }));
});
