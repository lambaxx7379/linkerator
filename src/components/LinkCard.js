import React from "react";

import "./LinkCard.css";
import { updateCount, updateLink, linksWithTags } from "../api";

const LinkCard = ({ grabbedLinks, setGrabbedLinks }) => {

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

  const handleTagClick = async (tagName) => {
    console.log(tagName);
    try {
      const tagResults = await linksWithTags(tagName);
      console.log(tagResults, "this is the links with tags");
      setGrabbedLinks(tagResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cards-container">
      {grabbedLinks.map((link, index) => {
        return (
          <div className="inner-card" key={index}>
            <div className="top-row-card">
              <div className="click-count-container">
                <div className="click-count">{link.count}</div>
                <div className="click-label-bottom">CLICKS</div>
              </div>
              <div className="date-container">
                <div className="date">{link.share_date}</div>
                <div className="date-label-bottom">DATE SHARED</div>
              </div>
            </div>

            <div className="link-info">
              <div className="link-name">{link.name}</div>
              <a
                href={link.mainLink ? link.mainLink : "#"}
                target="_blank"
                className="link"
                onClick={() => {
                  // window.open(link.mainLink, "_blank").focus();
                  handleUpdateCount(link.id);
                }}
              >
                {" "}
                {link.mainLink}
              </a>
              <div className="comment">{link.comment}</div>
              <button
                type="button"
                className="edit-btn"
                onClick={() => handleSubmitUpdateComment(link.comment, link.id)}
              >
                Edit Comment
              </button>
            </div>

            <div className="tag-container">
              {link.tags[0]
                ? link.tags.map((tags, index) => {
                  return (
                    <div key={index}>
                      <button
                        type="button"
                        className="tags"
                        onClick={() => {
                          handleTagClick(tags.name);
                        }}
                      >
                        {tags.name}
                      </button>
                    </div>
                  );
                })
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LinkCard;
