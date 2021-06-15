import React from "react";
import './app.css';
import CreateForm from "./CreateForm";
import LinkCard from "./LinkCard";

const App = () => {


  return (

    <div className="App">

      <header>
        <div>The Great Linkerator</div>
        <input
          type="text"
          id="header-search"
          placeholder="Search for links"
          name="s"
        />
      </header>

      <div className="top createForm">
        <CreateForm />
      </div>

      <div className='bottom card'>
        <LinkCard />
      </div>

    </div>
  );
};

export default App;

