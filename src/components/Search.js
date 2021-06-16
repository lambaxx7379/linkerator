import React, { useState, useEffect } from "react";

const Search = ({ grabbedLinks, setGrabbedLinks, reset }) => {
  let originalLinks = grabbedLinks.slice(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChange = (event) => {
    const keyWords = event.target.value;
    setSearchQuery(keyWords);
    console.log(searchQuery);
  };

  const handleSearchSubmit = (event) => {
    console.log(grabbedLinks);
    let filteredLinks = grabbedLinks.filter((link) => {
      return link.mainLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.tags.filter((tag) => {
          return tag.name.toLowerCase().includes(searchQuery.toLowerCase());
        }).length > 0
        ? link
        : "";
    });
    setGrabbedLinks(filteredLinks);
  };

  const handleReset = () => {
    console.log(originalLinks);
    reset();
  };

  const handleMostPopular = () => {
    console.log(grabbedLinks);
    let linkCount = [...grabbedLinks].sort(function (a, b) {
      return parseInt(b.count) - parseInt(a.count);
    });

    setGrabbedLinks(linkCount);
  };

  return (
    <>
      <div>The Great Linkerator</div>
      <input
        type="text"
        id="header-search"
        placeholder="Search for links"
        name="s"
        onChange={handleOnChange}
      />
      <button onClick={handleSearchSubmit}>Search</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleMostPopular}>Most Popular</button>
    </>
  );
};

export default Search;
