// App.js

import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/posts/:postId" element={<SinglePost />} />
            </Routes>
        </Router>
    );
}

export default App;
