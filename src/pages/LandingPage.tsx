import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedPost from "../components/PostContainer";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

const sections = [
    { title: "Technology", url: "#" },
    { title: "Design", url: "#" },
    { title: "Culture", url: "#" },
    { title: "Business", url: "#" },
    { title: "Politics", url: "#" },
    { title: "Opinion", url: "#" },
    { title: "Science", url: "#" },
    { title: "Health", url: "#" },
    { title: "Style", url: "#" },
    { title: "Travel", url: "#" },
];

interface Post {
    id: number;
    title: string;
    content: string;
}

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme({
//     palette: {
//         mode: "dark",
//     },
// }); Dark Mode

const defaultTheme = createTheme();
export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        axios
            .get<Post[]>("http://localhost:3000/posts")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container sx={{ backgroundColor: "rgba(239,239,240)", borderRadius: "10px", pb: 4 }}>
                <Header title="Blog" sections={sections} />
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
