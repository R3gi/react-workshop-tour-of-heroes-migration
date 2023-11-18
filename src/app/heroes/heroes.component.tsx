import { Component, ViewEncapsulation } from '@angular/core';
import React from 'react';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { AbstractReactComponent } from '../react-root/abstract-react.component';
import { Heroes } from './react/Heroes';

@Component({
  template: `<react-root id="heroes"></react-root>`,
  styleUrls: [ './heroes.component.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class HeroesComponent extends AbstractReactComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    super();
  }

  private getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  add = (name: string): void => {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete = (hero: Hero): void => {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  renderComponent(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    return <Heroes getHeroes$={this.getHeroes()} addHero={this.add} deleteHero={this.delete} />
  }
}
