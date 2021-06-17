
import React, { useState, useEffect } from "react";
import './app.css';
import CreateForm from "./CreateForm";
import LinkCard from "./LinkCard";
import Search from "./Search"
import { getLinks } from "../api";
import linkBackground from "../img/link_background.png"


const App = () => {
  const [grabbedLinks, setGrabbedLinks] = useState([]);

  const retrieveLinks = () => {

    getLinks()
      .then(link => {
        setGrabbedLinks(link);

      })
      .catch(error => {
        // something something errors
      });
  }


  useEffect(() => {

    retrieveLinks()
  }, []);

  return (

    <div className="App">

      <header style={{
        backgroundImage: `url(${linkBackground})`
      }}>

        <Search
          grabbedLinks={grabbedLinks}
          setGrabbedLinks={setGrabbedLinks}
          reset={retrieveLinks}
        />


      </header>

      <div className="top createForm">
        <CreateForm />
      </div>

      <div className='bottom card'>
        <LinkCard
          grabbedLinks={grabbedLinks}
          setGrabbedLinks={setGrabbedLinks}
        />
      </div>

    </div>
  );
};

export default App;

