// Comment.tsx
import React from "react";

interface CommentProps {
    comment: {
        id: number;
        body: string;
    };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div>
            <p>{comment.body}</p>
        </div>
    );
};

export default Comment;
