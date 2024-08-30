import React from "react";
import { useState } from "react";

import "./Home.scss";

const HomeCard = () => (
    <div>
        <span>Hi!</span>
    </div>
)

const Home = () => {
    const [displayName, setDisplayName] = useState<string>();
    const [name, setName] = useState<string>();

    function handleClearClick() {
        setDisplayName("");
        setName("");
    }

    return (
        <article className="home-content">
            <HomeCard />
            <label>{displayName}</label>
            <input type="text" onChange={val => setName(val.target.value)} />
            <button onClick={() => setDisplayName(name)}>Set Name</button>
            <button onClick={() => handleClearClick()}>Clear</button>
        </article>
    )
}

export default Home;