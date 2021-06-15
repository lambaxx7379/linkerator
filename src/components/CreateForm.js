import React, { useState } from "react";
import { createNewLink } from "../api";

const CreateForm = () => {
  const [name, setName] = useState("");
  const [mainLink, setMainLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit() {
    await createNewLink(name, mainLink, comment, tags);
  }

  return (
    <div>
      <h1>Create a New Link:</h1>
      <div>
        <form>
          <label>Name:</label>
          <input
            placeholder="Name..."
            // value="{name}"
            onChange={(event) => setName(event.target.value)}
          />
          <label>Link:</label>
          <input
            placeholder="Link(Must have https://www.)..."
            // value="{mainLink}"
            onChange={(event) => setMainLink(event.target.value)}
          />
          <label>Comment:</label>
          <input
            placeholder="Comment..."
            // value="{comment}"
            onChange={(event) => setComment(event.target.value)}
          />
          <label>Tags:</label>
          <input
            placeholder="Tags..."
            // value="{tags}"
            onChange={(event) => setTags(event.target.value)}
          />
          <button onClick={handleSubmit}>Add Link</button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
