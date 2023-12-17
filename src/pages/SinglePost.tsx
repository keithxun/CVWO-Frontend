// SinglePost.js
import Comment from "../components/Comment";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
    id: number;
    title: string;
    content: string;
}

interface Comment {
    id: number;
    postId: number;
    body: string;
}

const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get<Post>(`http://localhost:3000/posts/${postId}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error("Error fetching post:", error));
        axios
            .get<Comment[]>(`http://localhost:3000/posts/${postId}/comments`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error("Error fetching comment:", error));
    }, [postId]);

    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/posts/${postId}`);
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={handleDeletePost}>Delete Post</button>
            <h2>Comments</h2>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default SinglePost;
