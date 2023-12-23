// App.js

// import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import NewPostForm from "./pages/NewPostForm";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Posts />} /> */}
                <Route path="/posts/:postId" element={<SinglePost />} />
                <Route path="/new-post-form" element={<NewPostForm />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
