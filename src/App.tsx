// App.js

import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
import NewPostForm from "./components/NewPostForm";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/posts/:postId" element={<SinglePost />} />
                <Route path="/new-post-form" element={<NewPostForm />} />
            </Routes>
        </Router>
    );
}

export default App;
