import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../Context/Context'
import './tv.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Tv() {


 const {allTv} = useContext(ApiContext)








  return <>

<Helmet>
    <title>Tv</title>
    </Helmet>
{ allTv != null? 
  <div className="container-fluid" id='home'>


    <div className="row align-items-center">


      {allTv.map( (tv)=> <div key={tv.id} className='col-md-2'>
      <Link className='text-decoration-none' to={`/movieDetails/tv/${tv.id}`}>
      
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
      </Link>
      </div> )}
    </div>



  </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i className='fa-solid fa-spinner fa-spin fa-7x text-warning'></i>
</div>
 }







  </>
}
