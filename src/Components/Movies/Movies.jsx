import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Context/Context";
import { Link, NavLink } from "react-router-dom";
import './Movie.css'
import { Helmet } from "react-helmet";
export default function Movies() {
  const { allMovies, setAllMovies, getTrendingMovies } = useContext(ApiContext);
  const [currentCategory, setCategory] = useState("popular");

  let pageNumbers = new Array(10).fill("x").map((el, i) => i + 1);

  async function search(e) {
    let value = e.target.value;
    if (value != "") {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US&query=${value}&page=1&include_adult=false`
      );
      setAllMovies(data.results);
    } else {
      getTrendingMovies();
    }
  }

  function changePage(page) {
    getTrendingMovies(page, currentCategory);
  }

  function changeType(e) {
    let type = e.target.id;
    setCategory(type);
    getTrendingMovies(1, type);
  }
  return (
    <>

<Helmet>
    <title> Movie</title>
    </Helmet>
      <input
        onChange={search}
        type="text"
        className="form-control bg-transparent w-75 mx-auto text-white my-4"
        placeholder="Search..."
      />
      {allMovies != null ? (
        <div className="container" id="home" >
          <div className="row ">
            <div className="col-md-2   ">
              <div className="sideBar text-center py-5 ">

                <li className="nav-item list-unstyled my-3 py-1 ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    id="top_rated"
                    onClick={changeType}
                    aria-current="page"
                  >
                    Top Rated
                  </NavLink>
                </li>
                <li className="nav-item list-unstyled my-3 py-1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    id="upcoming"
                    onClick={changeType}
                    aria-current="page"
                  >
                     UP Coming
                  </NavLink>
                </li>
                <li className="nav-item list-unstyled my-3 py-1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    id="top_rated"
                    onClick={changeType}
                    aria-current="page"
                  >
                    Top Rated
                  </NavLink>
                </li>

                {/* <div className="test  ">
                  <h5
                    className="sideContent py-2  "
                     id="now_playing"
                    onClick={changeType}
                  >
                       Now Playing
                  </h5>
                  <h5
                    className="sideContent py-2  "
                    id="upcoming"
                    onClick={changeType}
                  >
                    UP Coming
                  </h5>
                  <h5
                    className="sideContent py-2  "
                    id="now_playing"
                    onClick={changeType}
                  >
                    Now Playing
                  </h5>
                </div> */}
              </div>
            </div>

            <div className="col-md-10 ">
              <div className="row">
                {allMovies.map((movie) => (
               
                  <div key={movie.id} className="col-md-2">
                 <Link className='text-decoration-none' to={`/movieDetails/movie/${movie.id}`}>
               <div className="movie home-card m-2 position-relative">
                 <img
                   src={
                     "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                   }
                   className="w-100"
                   alt=""
                 />
                  <h5 className='text-center overflow-hidden text-wrap'>
                          {movie?.title.length > 30 ? movie.title.substr(0, 20) + "..." : movie.title}
                  </h5>
                  <h6 className='text-warning rounded vote '>
                          <i className='fa fa-star text-warning me-2'></i>
                          {movie?.vote_average.toFixed(1)}
                        </h6>
               </div>
           </Link>
             </div>
                ))}
              </div>
            </div>
          </div>

          <nav
            aria-label="..."
            className="bg-transparent d-flex justify-content-center"
          >
            <ul className="pagination pagination-lg">
              {pageNumbers.map((ele) => (
                <li
                  onClick={() => changePage(ele)}
                  key={ele}
                  className="page-item"
                >
                  <a className="page-link">{ele}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-7x text-warning"></i>
        </div>
      )}
    </>
  );
}
