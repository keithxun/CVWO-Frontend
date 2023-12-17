// SinglePost.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    content: string;
}

const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        axios
            .get<Post>(`http://localhost:3000/posts/${postId}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error("Error fetching post:", error));
    }, [postId]);

    if (!post) {
        return <div>Cannot be found!</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default SinglePost;
