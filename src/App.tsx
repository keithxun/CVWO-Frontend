import SinglePost from "./pages/SinglePost";
import NewPostForm from "./pages/NewPostForm";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/posts/:postId" element={<SinglePost />} />
                    <Route path="/new-post-form" element={<NewPostForm />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
