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

export default function Comment({ data, postId, isOnComment = false }: { data: CommentInterface; postId: string; isOnComment?: boolean }) {
  const [reply, setReply] = useState(false);

    const commentsOnCommentQuery = useQuery({
    queryKey: ['commentsOnComment', data._id],
    queryFn: () =>
      fetch(`https://blog-api-ol7v.onrender.com/v1/posts/${postId}/comments/${data._id}`).then(res =>
        res.json()
        ),
  });

  function handleClick() {
    setReply(prevState => !prevState); 
  }

  return (
    <div className={`grid p-2 border-b-2 border-2 border-ivory-transparent ${isOnComment ? 'bg-black-brown'  : 'bg-ivory-transparent'}`}>
      <p className='opacity-50 text-xs'>{data.author.username}</p>
      <p className='px-2'>{data.body}</p>
      <div className='flex justify-end py-2'>
      <button onClick={handleClick} className='py-1 self-end text-xs border-ivory border text-ivory rounded px-2 w-fit hover:bg-ivory hover:text-black-brown'>Reply</button>
      </div>
      {reply && <UserComment id={data._id} isOnComment={true} postId={postId} />}
      <div className='grid gap-1'>
        {commentsOnCommentQuery.data?.comments.length > 0 && commentsOnCommentQuery.data.comments.map((comment: CommentInterface) => <Comment key={comment._id} data={comment} postId={postId} isOnComment={true}/>)}
      </div>
    </div>
  )
}
