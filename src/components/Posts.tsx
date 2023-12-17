import React from "react";
import { makeStyles } from "@mui/styles";

interface PostsProps {
    posts: { title: string; content: string }[];
    newPost: { title: string; content: string };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onAddPost: () => void;
}

const useStyles = makeStyles({
    postsContainer: {
        display: "grid",
        gap: "10px",
        // Add any other styles you need for the container
    },
    postItem: {
        // Add styles for individual post items
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
    },
    title: {
        fontSize: "1.5rem", // Adjust the font size as needed
        fontWeight: "bold", // Make the title bold or adjust as needed
        marginBottom: "8px", // Add some space between title and content
    },
    content: {
        fontSize: "1rem", // Adjust the font size as needed
    },
});

const Posts: React.FC<PostsProps> = ({ posts, newPost, onInputChange, onAddPost }) => {
    const classes = useStyles();
    return (
        <div className={classes.postsContainer}>
            <h1>Blog Posts</h1>
            {posts.map((post, index) => (
                <div key={index} className={classes.postItem}>
                    <h3 className={classes.title}>{post.title}</h3>
                    <p className={classes.content}>{post.content}</p>
                </div>
            ))}

            <h2>Add a New Post</h2>
            <input type="text" placeholder="Title" name="title" value={newPost.title} onChange={onInputChange} />
            <textarea placeholder="Content" name="content" value={newPost.content} onChange={onInputChange} />
            <button onClick={onAddPost}>Add Post</button>
        </div>
    );
};

export default Posts;
