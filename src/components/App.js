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

      <div className='left card'>
        <div className='cards-container'>
          <div className='inner-card'>
            <div className='link-info'>
              <div className='link-name'>Google</div>
              <div className='link'>Google.com</div>
              <div className='comment'>search engine, the biggest, slows doown your mac</div>
              <div className='date'>01/01/2021</div>
              <div className='click-count'>5</div>
            </div>
            <div className='tag-container'>
              <div className='tags'>Tag 1</div>
              <div className='tags'>Tag 2</div>
              <div className='tags'>Tag 3</div>
            </div>
            <button>Edit</button>
          </div>

          <div className='inner-card'>
            <div className='link-info'>
              <div className='link-name'>Google</div>
              <div className='link'>Google.com</div>
              <div className='comment'>search engine</div>
              <div className='date'>01/01/2021</div>
              <div className='click-count'>5</div>
            </div>
            <div className='tag-container'>
              <div className='tags'>Tag 1</div>
              <div className='tags'>Tag 2</div>
              <div className='tags'>Tag 3</div>
            </div>
            <button>Edit</button>
          </div>

          <div className='inner-card'>
            <div className='link-info'>
              <div className='link-name'>Google</div>
              <div className='link'>Google.com</div>
              <div className='comment'>search engine</div>
              <div className='date'>01/01/2021</div>
              <div className='click-count'>5</div>
            </div>
            <div className='tag-container'>
              <div className='tags'>Tag 1</div>
              <div className='tags'>Tag 2</div>
              <div className='tags'>Tag 3</div>
            </div>
            <button>Edit</button>
          </div>

          <div className='inner-card'>
            <div className='link-info'>
              <div className='link-name'>Google</div>
              <div className='link'>Google.com</div>
              <div className='comment'>search engine</div>
              <div className='date'>01/01/2021</div>
              <div className='click-count'>5</div>
            </div>
            <div className='tag-container'>
              <div className='tags'>Tag 1</div>
              <div className='tags'>Tag 2</div>
              <div className='tags'>Tag 3</div>
            </div>
            <button>Edit</button>
          </div>
        </div>

      </div>

      <div className="right createForm">
        <CreateForm />
        <LinkCard />
      </div>



    </div>
  );
};

export default App;

