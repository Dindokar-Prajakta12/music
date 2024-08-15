import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] =useState("");
  const [isLoading, setIsLoading] = useState(true)

  const getTracks = async () => {
    setIsLoading(true)
    let data = await fetch(`https://v1.nocodeapi.com/prajakta_dindokar/spotify/WWrKTxmhJjpOogOJ/search?q=${keyword===""?"trending":keyword}&type=track`);
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items); 
    setIsLoading(false)
  };
  useEffect(() => {
    getTracks()

  } ,[]);

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            V-Music
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className='collapse navbar-collapse d-flex justify-content-center'>
            id="navbarSupportedContent"
        {/* </div> */}
          
          <input 
          value={keyword}
          onChange={event=> setKeyword(event.target.value)}
            className="form-control me-2 "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
         
          
          <button onClick={getTracks} className="btn btn-outline-success" >
            Search
          </button>
        </div>
        
      </nav>
  
      


      <div className="container">
        <div className= {`row ${isLoading?"":"d-none"}`}>
          <div className='col-12 py-5' >
          <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

          </div>
        </div>
        <div className="row">
         
        
        
         {
          tracks.map((element) => {
            return(
              <div key={element.id} className='col-lg-3 col-md-6 py-2'>
                {/* <img className='border-2 w-100' src={element.album.images[0].url} alt=''/> */}
                {/* <p>{element.id}</p> */}

        <div className="card">
  <img src={element.album.images[0].url} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{element.name}</h5>
    <p className="card-text" >Artist: {element.album.artists[0].name}</p>
    <p className="card-text" >Release Date: {element.album.release_date}</p>

   <audio src={element.preview_url} controls className="w-100"></audio>
  </div>
</div>

              </div>
            )
          })
         }
        </div>



      </div>

    </>
  );
}

export default App;
