import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import * as React from "react";
// import { useTheme } from "@mui/material";

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
    // const theme = useTheme();
    const previewContent = () => {
        const maxLength = 200;
        if (post.content.length <= maxLength) {
            return post.content;
        } else {
            const truncatedContent = post.content.slice(0, maxLength);
            const lastSpaceIndex = truncatedContent.lastIndexOf(" ");
            return lastSpaceIndex > 0 ? truncatedContent.slice(0, lastSpaceIndex) : truncatedContent;
        }
    };
    return (
        <Grid item xs={12} md={6}>
            <Card>
                <CardActionArea
                    component={Link}
                    to={`/posts/${post.id}`}
                    sx={{ bgcolor: "background.paper", borderRadius: "10px" }}
                >
                    <CardActionArea sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            {/* <Typography variant="subtitle1" color="text.secondary">
                            {post.date}
                        </Typography> */}
                            <Typography variant="subtitle1" paragraph>
                                {previewContent()}
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
            </Card>
        </Grid>
    );
}
