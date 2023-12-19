// SinglePost.js

import CommentContainer from "../components/CommentContainer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [addingComment, setAddingComment] = useState(false);
    const [newComment, setNewComment] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        //retrieve post details
        axios
            .get<Post>(`http://localhost:3000/posts/${postId}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error("Error fetching post:", error));
        //retrieve list of comments
        axios
            .get<Comment[]>(`http://localhost:3000/posts/${postId}/comments`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error("Error fetching comment:", error));
    }, [postId]); //wrt to postId

    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/posts/${postId}`);
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleAddComment = async () => {
        try {
            // Make a POST request to add a new comment
            await axios.post<Comment>(`http://localhost:3000/posts/${postId}/comments`, {
                body: newComment,
                postId: Number(postId),
            });

            // Refetch comments to include the new one
            const updatedComments = await axios.get<Comment[]>(`http://localhost:3000/posts/${postId}/comments`);
            setComments(updatedComments.data);

            // Reset state
            setAddingComment(false);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
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
                <CommentContainer key={comment.id} comment={comment} />
            ))}
            {!addingComment && <button onClick={() => setAddingComment(true)}>Add Comment</button>}

            {addingComment && (
                <div>
                    <textarea
                        placeholder="Your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Add Comment</button>
                    <button onClick={() => setAddingComment(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
