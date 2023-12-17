// NewPostForm.tsx

import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

interface NewPostFormProps {
    onAddPost: (newPost: Post) => void;
}

interface Post {
    id: number;
    title: string;
    content: string;
}
const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
    const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", content: "" });
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    // const handleAddPost = () => {
    //     axios
    //         .post("http://localhost:3000/posts", { post: newPost })
    //         .then((response) => {
    //             onAddPost(response.data);
    //             setNewPost({ id: 0, title: "", content: "" });
    //             // Redirect to the main posts page after adding a new post
    //             navigate("/");
    //         })
    //         .catch((error) => console.error("Error adding post:", error));
    // };
    const handleAddPost = () => {
        // Notify the parent component (Posts) about the new post
        onAddPost(newPost);

        // Reset the form
        setNewPost({ id: 0, title: "", content: "" });

        // Redirect to the main posts page after adding a new post
        navigate("/");
    };
    return (
        <div>
            <h2>Add a New Post</h2>
            <input type="text" placeholder="Title" name="title" value={newPost.title} onChange={handleInputChange} />
            <textarea placeholder="Content" name="content" value={newPost.content} onChange={handleInputChange} />
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    );
};

export default NewPostForm;
