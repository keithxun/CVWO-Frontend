import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import * as React from "react";

interface FeaturedPostProps {
    post: {
        //date: string;
        id: number;
        title: string;
        content: string;
    };
}

export default function FeaturedPost(props: FeaturedPostProps) {
    const { post } = props;

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component={Link} to={`/posts/${post.id}`}>
                <CardActionArea sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        {/* <Typography variant="subtitle1" color="text.secondary">
                            {post.date}
                        </Typography> */}
                        <Typography variant="subtitle1" paragraph>
                            {post.content}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </CardContent>
                    {/* <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                        image={post.image}
                        alt={post.imageLabel}
                    /> */}
                </CardActionArea>
            </CardActionArea>
        </Grid>
    );
}
