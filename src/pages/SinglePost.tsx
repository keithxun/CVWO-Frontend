import CommentContainer from "../components/CommentContainer";
import PostContainer from "../components/PostContainer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BASE_URL } from "../api";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface Comment {
    id: number;
    body: string;
    postId: number;
}

export interface Post {
    id: number;
    title: string;
    content: string;
}

const defaultTheme = createTheme();

const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const navigate = useNavigate();

    // Retrieve the dark mode setting from local storage
    const storedDarkMode = localStorage.getItem("DARK_MODE");
    const [darkMode, setDarkMode] = useState(storedDarkMode === "true");
    const authToken = localStorage.getItem("authToken");
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        // Save the new setting in local storage
        localStorage.setItem("DARK_MODE", String(newDarkMode));
    };

    const darkTheme = createTheme({
        ...defaultTheme,
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    useEffect(() => {
        axios
            .get<Post>(`${BASE_URL}/posts/${postId}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error("Error fetching post:", error));
        axios
            .get<Comment[]>(`${BASE_URL}/posts/${postId}/comments`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error("Error fetching comment:", error));
    }, [postId]); //wrt to postId

    const handleDeletePost = async () => {
        try {
            await axios.delete(`${BASE_URL}/posts/${postId}`, {
                headers: {
                    Authorization: authToken,
                },
            });
            navigate("/");
        } catch (error) {
            toast.error("You are not signed in");
        }
    };

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post<Comment>(
                `${BASE_URL}/posts/${postId}/comments`,
                {
                    body: newComment,
                    postId: Number(postId),
                },
                {
                    headers: {
                        Authorization: authToken,
                    },
                },
            );

            // Refetch comments to include the new one
            const updatedComments = await axios.get<Comment[]>(`${BASE_URL}/posts/${postId}/comments`);
            setComments(updatedComments.data);

            // Reset state
            setNewComment("");
        } catch (error) {
            toast.error("You are not signed in");
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container sx={{ borderRadius: "10px", pb: 4 }}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <main>
                    <Box mt={2}>
                        <PostContainer key={post.title} post={post} />
                    </Box>
                    <Button
                        onClick={handleDeletePost}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Delete Post
                    </Button>
                    <Box component="form" onSubmit={handleAddComment} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="New Comment"
                            label="New Comment"
                            name="New Comment"
                            autoFocus
                            value={newComment}
                            multiline
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Add Comment
                        </Button>
                    </Box>

                    {comments.map((comment) => (
                        <CommentContainer key={comment.id} comment={comment} />
                    ))}
                </main>
            </Container>

            <Footer title="Motivation Quote" description="Do things without regrets!" />
        </ThemeProvider>
    );
};

export default SinglePost;
