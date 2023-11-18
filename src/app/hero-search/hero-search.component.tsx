import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { AbstractReactComponent } from '../react-root/abstract-react.component';
import { HeroSearch } from './react/HeroSearch';
import React from 'react';

@Component({
  selector: 'app-hero-search',
  styleUrls: [ './hero-search.component.css' ],
  template: `<react-root id="search"></react-root>`,
  encapsulation: ViewEncapsulation.None,
})
export class HeroSearchComponent extends AbstractReactComponent {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
    super();
  }

  // Push a search term into the observable stream.
  search = (term: string): void  => {
    this.searchTerms.next(term);
  }

  ngOnInit (): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  renderComponent(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    return <HeroSearch getHeroes$={this.heroes$} search={this.search} />
  }
}
