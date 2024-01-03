import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
// import { useTheme } from "@mui/material";

interface CommentProps {
    comment: {
        id: number;
        body: string;
    };
}

export default function PostContainer(props: CommentProps) {
    const { comment } = props;
    // const theme = useTheme();
    return (
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <Card>
                <CardContent sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="subtitle1">{comment.body}</Typography>
                    </CardContent>
                </CardContent>
            </Card>
        </Grid>
    );
}
