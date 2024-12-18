import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from '../../Context/Context';
import'./Home.css';
import { Helmet } from 'react-helmet';
export default function Home() {

let {allMovies, allTv,person} = useContext(ApiContext)




  return <>
    <Helmet>
    <title>Home</title>
    </Helmet>
{allMovies != null && allTv != null? 
  <div className="container-fluid" id='home'>
    <div className="row align-items-center">

    <div className='col-6 col-sm-3 col-lg-4 p-3 pt-lg-5 ps-lg-4 pe-lg-5'> 
                <div className='w-25 border mb-3'></div>
                <h2 className='text-warning fw-normal h1 mb-0'>Trending</h2> 
                <h2 className='text-warning fw-normal h1 mb-0'>movies</h2> 
                <h2 className='text-warning fw-normal h1 mb-md-3 mb-lg-3 mb-xl-5'>for this week</h2> 
                <h3 className='fw-light test'>Browse the most trending</h3> 
                <div className='w-100 border mt-3'></div>
              </div>
    {allMovies.slice(0,10).map( (movie)=>  <div key={movie.id} className='col-6 col-sm-3 col-lg-2'>
                    <Link className='text-decoration-none' to={`/movieDetails/movie/${movie.id}`}>
                      <div className=' home-card m-2 position-relative'>
                      <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='w-100' alt=""/>
                        <h5 className='text-center overflow-hidden text-wrap'>
                          {movie?.title.length > 30 ? movie.title.substr(0, 30) + "..." : movie.title}
                        </h5>
                        <h6 className='text-warning rounded vote '>
                          <i className='fa fa-star text-warning me-2'></i>
                          {movie?.vote_average.toFixed(1)}
                        </h6>
                    
                      </div>
                    </Link>
                  </div>
 )}




    </div>
    
    
    <div className="row align-items-center">
    <div className='col-6 col-sm-3 col-lg-4 p-3 pt-lg-5 ps-lg-4 pe-lg-5'> 
                <div className='w-25 border mb-3'></div>
                <h2 className='text-warning fw-normal h1 mb-0'>Trending</h2> 
                <h2 className='text-warning fw-normal h1 mb-0'>tv shows</h2> 
                <h2 className='text-warning fw-normal h1 mb-md-3 mb-lg-3 mb-xl-5'>for this week</h2> 
                <h3 className='fw-light'>Browse the most trending</h3> 
                <div className='w-100 border mt-3'></div>
              </div>

      {allTv.slice(0,10).map( (tv)=> <div key={tv.id} className='col-md-2'>
        <Link to={`/movieDetails/tv/${tv.id}`}>
        
        <div className="tv">
        <div className=' home-card m-2 position-relative'>
                      <img src={'https://image.tmdb.org/t/p/w500/' + tv.poster_path} className='w-100' alt=""/>
                        <h5 className='text-center overflow-hidden text-wrap'>
                          { tv.name}
                        </h5>
                        <h6 className='text-warning rounded vote '>
                          <i className='fa fa-star text-warning me-2'></i>
                          {tv?.vote_average.toFixed(1)}
                        </h6>
                    
            </div>
        </div>
        </Link>
      </div> )}
    </div>


    <div className="row align-items-center">
    <div className='col-6 col-sm-3 col-lg-4 p-3 pt-lg-5 ps-lg-4 pe-lg-5'> 
                <div className='w-25 border mb-3'></div>
                <h2 className='text-warning fw-normal h1 mb-0'>Trending</h2> 
                <h2 className='text-warning fw-normal h1 mb-0'>Persons</h2> 
                <h2 className='text-warning fw-normal h1 mb-md-3 mb-lg-3 mb-xl-5'>for this week</h2> 
                <h3 className='fw-light'>Browse the most trending</h3> 
                <div className='w-100 border mt-3'></div>
              </div>

      {person.slice(0,10).map( (person)=> <div key={person.id} className='col-md-2'>
       
      <Link to={`/personDetails/person/${person.id}`}>
        <div className="person">
        <div className=' home-card m-2 position-relative'>
                      <img src={'https://image.tmdb.org/t/p/w500/' + person.profile_path} className='w-100' alt=""/>
                        <h5 className='text-center overflow-hidden text-wrap'>
                          { person.name}
                        </h5>
                        <h6 className='text-warning rounded vote '>
                          <i className='fa fa-star text-warning me-2'></i>
                            {person.popularity.toFixed(0)}
                        </h6>
                    
            </div>
        </div>
        </Link>
     
      </div> )}


    </div>



  </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i className='fa-solid fa-spinner fa-spin fa-7x text-warning'></i>
</div>
 }







  </>
}
