import React, { useState } from "react";
import { createNewLink } from "../api";
import "./form.css";


const CreateForm = () => {
  const [name, setName] = useState(null);
  const [mainLink, setMainLink] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);


  async function handleSubmit() {
    await createNewLink(name, mainLink, comment, tags);
  }

  return (
    <div className="form-container">
      <h1 className="form-header">CREATE A LINK</h1>
      <div>
        <form>
          <input
            placeholder="Name..."
            required
            onChange={(event) => setName(event.target.value)}
          />

          <input
            placeholder="Link(Must have https://www.)..."
            required
            onChange={(event) => setMainLink(event.target.value)}
          />

          <input
            placeholder="Comment..."
            required
            onChange={(event) => setComment(event.target.value)}
          />

          <input
            placeholder="Tags..."
            required
            onChange={(event) => setTags(event.target.value)}
          />
          <button className="sub-btn" onClick={handleSubmit}>
            Add Link
          </button>
        </form>
      </div>
    </div >
  );
}


export default CreateForm;
