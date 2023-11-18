import React, { FC, useEffect, useState } from 'react'
import { Observable, Subscription } from 'rxjs';
import { Hero } from '../../hero';

export const Dashboard: FC<{ heroes$: Observable<Hero[]> }> = ({ heroes$ }) => {
  const [heroes, setHeroes] = useState<Hero[]>();

  useEffect(() => {
    const subscription = heroes$.subscribe(heroes =>  setHeroes(heroes.slice(1, 5)));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div><h2>Top Heroes</h2>
      <div className="heroes-menu">
        {heroes?.map(hero => (
        <a
          key={hero.id}
          className='heroes-menu__link'
          href={`/detail/${hero.id}`}>
          {hero.name}
        </a>
        ))}
      </div></div>
  )
}
