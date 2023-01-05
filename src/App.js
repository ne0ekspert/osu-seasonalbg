import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ images, setImages ] = useState({
    backgrounds: []
  });

  const date_options = { dateStyle: 'medium', timeStyle: 'medium' };

  useEffect(() => {
    axios({
        url: 'https://cors-proxy.org/api/',
        method: 'get',
        headers: {
          'cors-proxy-url' : "https://osu.ppy.sh/api/v2/seasonal-backgrounds"
        },
    })
    .then((response) => {
      setImages(response.data.data);
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [setImages]);

  return (
    <div className="App">
      <div className='title'>
        <h1>osu!seasonalbg</h1>
        <p>There are {images.backgrounds.length} artworks. Ends at {new Date(images.ends_at).toLocaleString(undefined, date_options)}.</p>
      </div>
      {
        images.backgrounds.map((image, index) => 
          <div key={index} className='card'>
            <div className='header'>
              <img className='profile_picture' src={image.user.avatar_url} alt="Profile" />
              <b className='profile_username'>{image.user.username}</b>
              <div className='profile_countryFlag'>{image.user.country_code}</div>
              <p></p>
            </div>
            <img src={image.url} alt="Artwork" className='artwork' />
          </div>
        )
      }
    </div>
);
}

export default App;
