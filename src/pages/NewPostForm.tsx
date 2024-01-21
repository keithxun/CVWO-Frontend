import { BASE_URL } from "../api";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultTheme = createTheme();

export default function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const authToken = localStorage.getItem("authToken");

            await axios.post(
                `${BASE_URL}/posts`,
                {
                    post: {
                        title,
                        content,
                    },
                },
                {
                    headers: {
                        Authorization: authToken,
                    },
                },
            );
            navigate("/");
        } catch (error) {
            toast.error("You are not signed in");
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <PostAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New Post
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            value={title}
                            multiline
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="content"
                            label="Content"
                            type="content"
                            id="content"
                            value={content}
                            multiline
                            rows={14}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Post
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
