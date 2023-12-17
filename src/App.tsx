import Posts from "./components/Posts";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
interface Post {
    title: string;
    content: string;
}
function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({ title: "", content: "" });

    useEffect(() => {
        axios
            .get<Post[]>("http://localhost:3000/posts")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []); //Do this after render, function is passed into useEffect hook

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    }; //Called when change in input field, updates newPost state

    const handleAddPost = () => {
        axios
            .post<Post>("http://localhost:3000/posts", newPost)
            .then((response) => {
                setPosts([...posts, response.data]);
                setNewPost({ title: "", content: "" });
            })
            .catch((error) => console.error("Error adding post:", error));
    }; //Called when Add Post button is clicked, sends a POST request with data of newPost, New Post added to posts and New Post is reset

    return <Posts posts={posts} newPost={newPost} onInputChange={handleInputChange} onAddPost={handleAddPost} />; //Renders list of blog posts by using map on posts array and input field for new post
}

export default App;
