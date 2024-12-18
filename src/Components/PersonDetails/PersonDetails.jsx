import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../Context/Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function PersonDetails() {


const [objDetails, setObjDetails] = useState([]);
const {person} = useContext(ApiContext);
let {id,media} = useParams();

async function getPersonDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=f782df4875d1281d5cb1168239d13a29&language=en-US`)
    setObjDetails(data);
    console.log(data);
  

    
}


useEffect(() => {
 
    getPersonDetails();
}, [])



  return <>

  <Helmet>
    <title>{objDetails.name}</title>
  </Helmet>
  <div className="container">
  <div className="row my-5 ">

{person != null? <>
  <div className='col-md-4 mb-2 ps-0 ps-xl-5 mx-auto position-relative text-center d-flex flex-column'>
   <img src={'https://image.tmdb.org/t/p/w500/' + objDetails.profile_path} className='w-100 rounded' alt="tv" />

  </div>
  <div className='col-md-7 pt-3 px-sm-5 px-md-0 pe-0 pe-xl-5'>
    <h2 className='h1 mb-5'>{objDetails.name}</h2>

    <h5 className='fw-light'>Overview:</h5>
    <h5 className='fw-light mb-4 text-white-50'>{objDetails.biography}</h5>
    <h5 className='mb-4 fw-light'>Popularity: <span className='text-white-50'>{objDetails.popularity}</span></h5>
    <h5 className='mb-4 fw-light'>For adults: <span className='text-white-50'>{objDetails.adult ? 'Yes' : 'No'}</span></h5>
    <h5 className='mb-4 fw-light'>birthday:  <span className='text-white-50'>{objDetails.birthday} </span></h5>
    <h5 className='mb-4 fw-light'>Place Of Birthday: <span className='text-white-50'>{objDetails.place_of_birth} </span></h5>
    <h5 className='fw-light'>known_for_department: <span className='fw-normal bg-warning rounded p-1 me-2 text-white'>{objDetails.known_for_department}</span></h5>
  </div>

</> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i className='fa-solid fa-spinner fa-spin fa-7x text-warning'></i>
</div>}


    </div>
  </div>
  
  
  
  </>
}
