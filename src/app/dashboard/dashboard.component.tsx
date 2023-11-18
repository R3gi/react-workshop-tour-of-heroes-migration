import { Component, ViewEncapsulation } from '@angular/core';
import React from 'react';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Dashboard } from './react/Dashboard';
import { Observable} from 'rxjs';
import { AbstractReactComponent } from '../react-root/abstract-react.component';

@Component({
  templateUrl: `./dashboard.component.html`,
  styleUrls: [ './dashboard.component.css' ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DashboardComponent extends AbstractReactComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    super();
  }

  private getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  renderComponent(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    return <Dashboard heroes$={this.getHeroes()} />
  }
}
