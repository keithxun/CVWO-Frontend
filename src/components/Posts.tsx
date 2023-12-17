import NewPostForm from "./NewPostForm";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    content: string;
}

interface PostsProps {}

const useStyles = makeStyles({
    postsContainer: {
        display: "grid",
        gap: "10px",
        margin: "0 20px", // Add left and right margin
        // Add any other styles you need for the container
    },
    postItem: {
        border: "1px solid #ddd",
        padding: "20px", // Add padding all around the postItem container
        borderRadius: "5px",
        marginTop: "10px", // Adjust the margin-top to reduce space between the top and title
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

const Posts: React.FC<PostsProps> = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    // const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", content: "" });
    const [addingNewPost, setAddingNewPost] = useState(false);

    useEffect(() => {
        axios
            .get<Post[]>("http://localhost:3000/posts")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const handleAddPost = (newPost: Post) => {
        axios
            .post<Post>("http://localhost:3000/posts", newPost)
            .then((response) => {
                setPosts([...posts, response.data]);
                setAddingNewPost(false);
            })
            .catch((error) => console.error("Error adding post:", error));
    };

    const classes = useStyles();
    return (
        <div className={classes.postsContainer}>
            <h1>Blog Posts</h1>
            {!addingNewPost && <button onClick={() => setAddingNewPost(true)}>Add New Post</button>}

            {addingNewPost && <NewPostForm onAddPost={handleAddPost} />}
            {posts.map((post) => (
                <div key={post.id} className={classes.postItem}>
                    <Link to={`/posts/${post.id}`}>
                        <h2 className={classes.title}>{post.title}</h2>
                    </Link>
                    <p className={classes.content}>{post.content.slice(0, 50)}</p>
                </div>
            ))}
        </div>
    );
};

export default Posts;
