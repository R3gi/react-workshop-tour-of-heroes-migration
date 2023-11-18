import React, { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from 'react'
import { Hero } from '../../hero';
import { Observable } from 'rxjs';

export const Heroes: FC<{ getHeroes$: Observable<Hero[]>; addHero: (name: string) => void; deleteHero: (hero: Hero) => void  }> = ({ getHeroes$, addHero, deleteHero }) => {
  const [heroes, setHeroes] = useState<Hero[]>();
  const [inputValue, setInputValue] = useState('');
  const fetchHeroes = () =>  getHeroes$.subscribe(heroes => setHeroes(heroes));

  useEffect(() => {
    const subscription = fetchHeroes();

    return () => subscription.unsubscribe();
  }, []);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const handleAddHero = (name: string) => {
    addHero(name);

    fetchHeroes();
  }

  const handleDeleteHero = (hero: Hero) => {
    deleteHero(hero);

    fetchHeroes();
  }

  return (
    <>
      <h2>My Heroes</h2>

      <div>
        <label htmlFor="new-hero">Hero name: </label>
        <input id="new-hero" onChange={handleChangeInput} value={inputValue}  />
        <button type="button" className="add-button" onClick={() => handleAddHero(inputValue)}>
          Add hero
        </button>
      </div>

      <ul className="heroes">
        {heroes?.map((hero) =>
          <li key={hero.id}>
            <a href={`/detail/${hero.id}`}>
              <span className="badge">{hero.id}</span> {hero.name}
            </a>
            <button type="button" className="delete" title="delete hero" onClick={() => handleDeleteHero(hero)}>x</button>
          </li>
        )}
      </ul>
    </>
  )
};
