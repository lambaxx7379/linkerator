

import React, { useState, useEffect } from "react";

const Search = ({ grabbedLinks, setGrabbedLinks, reset }) => {
    // let originalLinks = [...grabbedLinks]

    let originalLinks = grabbedLinks.slice(0);
    const [searchQuery, setSearchQuery] = useState('')

    const handleOnChange = (event) => {
        const keyWords = event.target.value
        setSearchQuery(keyWords)
        console.log(searchQuery)

    }

    const handleSearchSubmit = (event) => {

        let filteredLinks = grabbedLinks.filter((link) => {
            return link.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setGrabbedLinks(filteredLinks)

    }

    const handleReset = () => {
        console.log(originalLinks)
        reset()
    }

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
        </>
    )



}

export default Search