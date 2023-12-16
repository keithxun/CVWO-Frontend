import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => () => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []); //Do this after render, function is passed into useEffect hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  }; //Called when change in input field, updates newPost state

  const handleAddPost = () => {
    axios
      .post("http://localhost:3000/posts", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", content: "" });
      })
      .catch((error) => console.error("Error adding post:", error));
  }; //Called when Add Post button is clicked, sends a POST request with data of newPost, New Post added to posts and New Post is reset

  return (
    <div>
      {JSON.stringify(posts)}
      <h1>Blog Posts</h1>
      {posts.map((posts) => (
        <div>
          {posts.title}
          {posts.content}
        </div>
      ))}

      <h2>Add a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newPost.title}
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Content"
        name="content"
        value={newPost.content}
        onChange={handleInputChange}
      />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  ); //Renders list of blog posts by using map on posts array and input field for new post
};

export default Posts;
