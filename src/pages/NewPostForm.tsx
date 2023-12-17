// NewPostForm.tsx

import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "axios";

interface NewPostFormProps {}

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

const NewPostForm: React.FC<NewPostFormProps> = () => {
    const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", content: "" });
    const navigate = useNavigate();

    const handleAddPost = async () => {
        try {
            await axios.post<Post>("http://localhost:3000/posts", newPost);
            setNewPost({ id: 0, title: "", content: "" });
            navigate("/");
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
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
