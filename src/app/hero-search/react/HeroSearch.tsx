import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Observable } from 'rxjs';
import { Hero } from '../../hero';

export const HeroSearch: FC<{ getHeroes$?: Observable<Hero[]>; search: (term: string) => void }> = ({ getHeroes$, search }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  const fetchHeroes = () => {
    const subscription = getHeroes$?.subscribe(heroes => setHeroes(heroes));

    return subscription;
  };

  useEffect(() => {
    const subscription = fetchHeroes();

    return () => subscription?.unsubscribe();
  }, []);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
  }

  return (
    <div id="search-component">
      <label htmlFor="search-box">Hero Search</label>
      <input id="search-box" onChange={handleChangeInput} />

      <ul className="search-result">
        {heroes?.map((hero: Hero) =>
          <li key={hero.id}>
            <a className="search-result__link" href={`/detail/${hero.id}`}>
              {hero.name}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
