import React, { useState }  from 'react'
import UserComment from './UserComment';
import { useQuery } from '@tanstack/react-query';

interface AuthorInterface {
  _id: string;
  username: string;
}
interface CommentInterface  {
  _id: string;
  on: string;
  onModel: string;
  author: AuthorInterface;
  body: string;
  timestamp: string;
  edited: boolean;
  deleted: boolean;
}

export default function Comment({ data, postId }: { data: CommentInterface, postId: string }) {
  const [reply, setReply] = useState(false);

    const commentsOnCommentQuery = useQuery({
    queryKey: ['commentsOnComments', data._id],
    queryFn: () =>
      fetch(`https://blog-api-ol7v.onrender.com/v1/posts/${postId}/comments/${data._id}`).then(res =>
        res.json()
        ),
  });

  function handleClick() {
    setReply(prevState => !prevState); 
  }

  console.log('soy un comment');

  return (
    <div>
      <p>{data.author.username}</p>
      <p>{data.body}</p>
      <button onClick={handleClick}>reply</button>
      {reply && <UserComment id={data._id} isOnComment={true} postId={postId} />}
      <div>
        {commentsOnCommentQuery.data?.comments.length > 0 && commentsOnCommentQuery.data.comments.map((comment: CommentInterface) => <Comment key={comment._id} data={comment} postId={postId} />)}
      </div>
    </div>
  )
}

// commentsOnCommentQuery.data?.comments.length > 0 && commentsOnCommentQuery.data?.comments.map((comment: CommentInterface) => <Comment key={comment._id} data={comment} postId={postId} />)