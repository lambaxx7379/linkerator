import React, { useState, useEffect } from "react";

import "./LinkCard.css";
import { getLinks, updateCount, updateLink } from "../api";

const LinkCard = () => {
  const [grabbedLinks, setGrabbedLinks] = useState();

  const getAllLinks = async () => {
    try {
      const links = await getLinks();
      console.log(links);
      setGrabbedLinks(links);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(getAllLinks, []);

  const handleUpdateCount = async (link) => {
    console.log(link);
    await updateCount(link);
    window.location.reload();
  };

  const handleSubmitUpdateComment = async (comment, id) => {
    try {
      await updateLink(comment, id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='cards-container'>

      {grabbedLinks?.map((link, index) => {
        return (
          <div className="inner-card" key={index}>
            <div className='top-row-card'>
              <div className='click-count-container'>
                <div className='click-count'>{link.count}</div>
                <div className='click-label-bottom'>CLICKS</div>
              </div>
              <div className='date-container'>
                <div className='date'>{link.share_date}</div>
                <div className='date-label-bottom'>DATE SHARED</div>
              </div>
            </div>

            <div className='link-info'>
              <div className='link-name'>{link.name}</div>
              <div className='link' onClick={() => {
                window.open(link.mainLink, "_blank").focus();
                handleUpdateCount(link.id);
              }}> {link.mainLink}</div>
              <div className='comment'>{link.comment}</div>
              <button
                type="button"
                onClick={() =>
                  handleSubmitUpdateComment(link.comment, link.id)
                }>
                Edit Comment
              </button>
            </div>


            <div className="tag-container">
              {link.tags[0]
                ? link.tags.map((tags, index) => {
                  return (
                    <div className='tags' key={index}>{tags.name}</div>
                  );
                })
                : null}
            </div>

            <div>
            </div>
          </div>
        );
      })}
    </div>

  );
};

export default LinkCard;
