import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

export function ApiContextFunction(props) {
  const [allMovies, setAllMovies] = useState(null);
  const [allTv, setAllTv] = useState(null);
  const [person, setPerson] = useState(null);

  async function getTrendingMovies(pageNum = 1, type = "popular") {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${type}?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US&page=${pageNum}`
    );

    setAllMovies(data.results);
  }

  async function getTvShows() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US`
    );

    setAllTv(data.results);
  }

  // https://api.themoviedb.org/3/person/popular?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US&page=1

  async function getTrendingPerson() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US&page=1`
    );
    setPerson(data.results);
    console.log(data);
  }

  useEffect(() => {
    getTrendingMovies();
    getTvShows();
    getTrendingPerson();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        allMovies,
        setAllMovies,
        allTv,
        getTrendingMovies,
        person,
        getTrendingPerson,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}
