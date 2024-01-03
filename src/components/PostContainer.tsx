import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
// import { useTheme } from "@mui/material";

interface PostProps {
    post: {
        //date: string;
        id: number;
        title: string;
        content: string;
    };
}

export default function PostContainer(props: PostProps) {
    const { post } = props;
    return (
        <Grid item xs={12} md={6}>
            <Card>
                <CardContent sx={{ display: "flex", flex: 1 }}>
                    <Box>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>

                        <Typography variant="subtitle1" paragraph>
                            {post.content}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}
