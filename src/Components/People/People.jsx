import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { ApiContext } from '../../Context/Context'
import { Link } from 'react-router-dom'

export default function People() {

    const {person} = useContext(ApiContext)


    
  return <>
  <Helmet>
    <title>People</title>
    </Helmet>

    {person != null ?
    <div className="container-fluid" id='home'>
    <div className="row align-items-center">
     
    {person?.map( (person)=> <div key={person.id} className='col-md-2'>
    <Link className='text-decoration-none' to={`/personDetails/person/${person.id}`}>
    
           
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
     
    
    </div>
: <div className="vh-100 d-flex justify-content-center align-items-center">
<i className='fa-solid fa-spinner fa-spin fa-7x text-warning'></i>
</div>    

}
  



  </>
}
