
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../Context/Context'

export default function MovieDetails() {

const [objDetails, setObjDetails] = useState([])

let {allMovies, allTv} = useContext(ApiContext)
let {id,media} = useParams()
        


async function getMovieDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US`)
    setObjDetails(data);
    console.log(data);
    
}


useEffect(() => {
 
    getMovieDetails();
}, [])

  return <>





  <div className="container">

    <Helmet>
 {objDetails.title? <title>{`${objDetails.title} Movie`}</title> :    <title>{`${objDetails.name} Tv`}</title>}
    </Helmet>
  <div className="row my-5 ">

{allMovies != null && allTv != null? <>
  <div className='col-md-4 mb-2 ps-0 ps-xl-5 mx-auto position-relative text-center d-flex flex-column'>
   <img src={'https://image.tmdb.org/t/p/w500/' + objDetails.poster_path} className='w-100 rounded' alt="tv" />

  </div>
  <div className='col-md-7 pt-3 px-sm-5 px-md-0 pe-0 pe-xl-5'>
    <h2 className='h1 mb-5'>{objDetails.title ? objDetails.title : objDetails.name}</h2>

    <h5 className='fw-light'>Overview:</h5>
    <h5 className='fw-light mb-4 text-white-50'>{objDetails.overview}</h5>
    {objDetails.number_of_seasons? <h5 className='fw-light'>Number Of Seasons: {objDetails.number_of_seasons} </h5> : ''}

    <h5 className='mb-4 fw-light'>Language: <span className='text-white-50'>{objDetails.original_language}</span></h5>

    <h5 className='mb-4 fw-light'>For adults: <span className='text-white-50'>{objDetails.adult ? 'Yes' : 'No'}</span></h5>
    <h5 className='mb-4 fw-light'>Rate:  <span className='text-white-50'>{objDetails.vote_average} / 10</span></h5>


    {objDetails.release_date ? <h5 className='mb-4 fw-light'>Release Date:  <span className='text-white-50'>{objDetails.release_date}</span> </h5> :  <h5 className='mb-4 fw-light'>Release Date:  <span className='text-white-50'>{objDetails.first_air_date}</span> </h5>}

    <h5 className='fw-light'>Genres:</h5>
 
    <div className='d-flex flex-wrap gap-1'>
              {objDetails?.genres?.map((genre,idx)=> <div key={idx} className='fw-normal bg-warning rounded p-1 me-2 text-white'>{genre.name}</div> )}
              </div>
    
  </div>

</> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i className='fa-solid fa-spinner fa-spin fa-7x text-warning'></i>
</div>}


    </div>
  </div>



  
  </>

}
