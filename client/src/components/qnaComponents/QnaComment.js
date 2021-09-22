import React, { useState } from 'react';

export default function QnaComment() {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const onSumbitComment = (e) => {
        e.preventDefault();
        const data = {
            key: 1,
            user: "[aa]",
            content: comment,
            recomments: []
        }
        setComments(comments.concat(data))
        setComment('')
    }
    //console.log(comment, comments)

    const onSubmitRecomment = e => {
        e.preventDefault();

    }
    return (
        <>
            <form onSubmit={onSumbitComment}>
                <input placeholder="질문 등록" onChange={(e) => setComment(e.target.value)} value={comment} />
            </form>
            <div>
                {comments.map((comment, index) => (<div>
                    <span>{comment.user}</span>
                    <span>{comment.content}</span>
                    <form onSubmit={onSubmitRecomment}>
                        <input />
                        <button>댓글</button>
                    </form>

                </div>))}
            </div>
        </>
    )
}