import React, {useEffect, useState} from 'react';
import './App.css'
import Tmdb from './tmdb';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredMovie';


export default () => {

  const [movieList, setMovieList] = useState ([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect (() => {
    
    //Pegando toda a lista
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

    //Pegando a featured
    let originals = list.filter(i => i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
  }

    loadAll();
  }, []);
  
  return (
    <div className = "page">

      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }

      <section className = "lists">
        {movieList.map((item, key) => (
          <MovieRow key = {key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );  
}
