import React, { useState, useEffect } from "react";
import "./LinkCard.css";
import { getLinks, updateCount } from "../api";

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
  return (
    <div>
      <h1>Links:</h1>
      <div className="links">
        {grabbedLinks?.map((link, index) => {
          return (
            <div className="linkcard" key={index}>
              <h2>Site Name:{link.name}</h2>
              <h2>
                Link:
                <span
                  className="mainlink"
                  onClick={() => {
                    window.open(link.mainLink, "_blank").focus();
                    handleUpdateCount(link.id);
                  }}
                >
                  {link.mainLink}
                </span>
              </h2>
              <h3>Comment:{link.comment}</h3>
              <h3>Date Shared:{link.share_date}</h3>
              <h3>Clicks:{link.count}</h3>
              <h3>
                <span>Tags:</span>
                <div className="tags">
                  {link.tags[0]
                    ? link.tags.map((tags, index) => {
                        return (
                          <span>
                            <h3 key={index}>{tags.name}</h3>
                          </span>
                        );
                      })
                    : null}
                </div>
              </h3>
              <button>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinkCard;
