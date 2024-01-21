import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedPost from "../components/FeaturedPostContainer";
import { BASE_URL } from "../api";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
}

const defaultTheme = createTheme();

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const storedDarkMode = localStorage.getItem("DARK_MODE");
    const initialDarkMode = storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
    const [darkMode, setDarkMode] = useState(initialDarkMode);

    useEffect(() => {
        axios
            .get<Post[]>(`${BASE_URL}/posts`)
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("DARK_MODE", String(!darkMode));
    };

    const darkTheme = createTheme({
        ...defaultTheme,
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container
                sx={{
                    backgroundColor: darkMode ? darkTheme.palette.grey[900] : darkTheme.palette.common.white,
                    borderRadius: "10px",
                    pb: 4,
                }}
            >
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <main>
                    <Grid container spacing={4}>
                        {posts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                </main>
            </Container>
            <Footer title="Motivation Quote" description="Do things without regrets!" />
        </ThemeProvider>
    );
}
