import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { AbstractReactComponent } from '../react-root/abstract-react.component';
import { ReactElement, JSXElementConstructor } from 'react';
import { HeroDetail } from './react/HeroDetail';
import React from 'react';
import { Observable } from 'rxjs';

@Component({
  styleUrls: [ './hero-detail.component.css' ],
  template: `<react-root id="detail"></react-root>`,
  encapsulation: ViewEncapsulation.None,
})
export class HeroDetailComponent extends AbstractReactComponent {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    super();
  }

  getHero = (): Observable<Hero> => {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    return this.heroService.getHero(id);
  }

  goBack = () => {
    this.location.back();
  }

  save$ = (hero: Hero) => {
    this.heroService.updateHero(hero).subscribe();
    // TODO: .subscribe(() => this.goBack());
  }

  renderComponent(): ReactElement<any, string | JSXElementConstructor<any>> {
    return <HeroDetail getHero$={this.getHero()} goBack={this.goBack} save$={this.save$} />
  }
}
