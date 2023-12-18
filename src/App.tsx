// App.js

import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import NewPostForm from "./pages/NewPostForm";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/posts/:postId" element={<SinglePost />} />
                <Route path="/new-post-form" element={<NewPostForm />} />
                <Route path="/sign-up-form" element={<SignUpForm />} />
                <Route path="/sign-in-form" element={<SignInForm />} />
            </Routes>
        </Router>
    );
}

export default App;
