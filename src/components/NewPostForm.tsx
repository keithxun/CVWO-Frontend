// NewPostForm.tsx

import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
//import axios from "axios";

interface NewPostFormProps {
    onAddPost: (newPost: Post) => void;
}

interface Post {
    id: number;
    title: string;
    content: string;
}

const useStyles = makeStyles({
    inputContainer: {
        display: "grid",
        gap: "10px",
        margin: "0 20px",
    },
    textContainer: {
        border: "1px solid #ddd",
        padding: "20px", // Add padding all around the postItem container
        borderRadius: "5px",
        marginTop: "10px", // Adjust the margin-top to reduce space between the top and title
    },
});

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
    const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", content: "" });
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleAddPost = () => {
        // Notify the parent component (Posts) about the new post
        onAddPost(newPost);

        // Reset the form
        setNewPost({ id: 0, title: "", content: "" });

        // Redirect to the main posts page after adding a new post
        navigate("/");
    };

    const classes = useStyles();
    return (
        <div>
            <h2>Add a New Post</h2>
            <input
                type="text"
                placeholder="Title"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                className={classes.inputContainer}
            />
            <textarea
                placeholder="Content"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                className={classes.textContainer}
            />
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    );
};

export default NewPostForm;
