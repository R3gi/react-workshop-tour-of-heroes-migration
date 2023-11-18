import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Observable } from 'rxjs';
import { Hero } from '../../hero';

export const HeroDetail: FC<{ getHero$: Observable<Hero>; goBack: () => void; save$: (hero: Hero) => void }> = ({ getHero$, goBack, save$ }) => {
  const [hero, setHero] = useState<Hero>();
  const [inputValue, setInputValue] = useState(hero?.name || '');

  useEffect(() => {
    const subscription = getHero$.subscribe(hero => setHero(hero));

    return () => subscription.unsubscribe();
  }, []);

  if (!hero) {
    return <p>loading...</p>;
  }

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const handleSave = () => {
    if (hero && inputValue) {
      save$({ ...hero, name: inputValue! });
    }
  }

  return (
    <div>
      <h2>{hero.name} Details</h2>
      <div><span>id: </span>{hero.id}</div>
      <div>
        <label htmlFor="hero-name">Hero name: </label>
        <input id="hero-name" placeholder="Hero name" onChange={handleChangeInput} value={inputValue} />
      </div>
      <button type="button" onClick={goBack}>go back</button>
      <button type="button" onClick={handleSave}>save</button>
    </div>
  )
}

