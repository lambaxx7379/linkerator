import React, { useState, useEffect } from 'react';

import {
  getLinks,
} from '../api';

const App = () => {
  const [links, setLinks] = useState([]);


  useEffect(() => {
    getLinks()
      .then(link => {
        setLinks(link);
        console.log(links, 'this should be links')
      })
      .catch(error => {
        console.log(error)
      });
  });

  return (
    <div className="App">
      <div className="links-container">


        {links.map(({ id,
          name,
          mainLink,
          comment,
          share_date,
        }) => (
          <div key={id} className="cards-container">
            <div className="card">
              <div className='card-name'>Routine Name:<p>{name}</p></div>
              <div className='card-link'>Goal:<p>{mainLink}</p></div>
              <div className='card-comment'>Goal:<p>{comment}</p></div>
            </div>
          </div>

        ))}

      </div>

    </div>
  )
}

export default App;