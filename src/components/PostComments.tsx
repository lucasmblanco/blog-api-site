import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useQuery } from '@tanstack/react-query';

interface AuthorInterface {
  _id: string;
  username: string;
}
interface CommentInterface  {
  "_id": string;
  "on": string;
  "onModel": string;
  "author": AuthorInterface;
  "body": string;
  "timestamp": string;
  "edited": boolean;
  "deleted": boolean;
}



export default function PostComments({ id }: { id: string }) {
  const [postComments, setPostComments] = useState<CommentInterface[]>([]); 
  const commentsQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      fetch(`https://blog-api-ol7v.onrender.com/v1/posts/${id}/comments`).then(res =>
        res.json()
      )
  });

  useEffect(() => {
    if (commentsQuery.isSuccess) {
      setPostComments(commentsQuery.data.comments); 
    }
},[commentsQuery.data])

  return (        
    <>
      <hr></hr>
        <section className='grid gap-2 font-georgia py-2'>
        {postComments.length > 0 ? postComments.map((comment: CommentInterface) => <Comment key={comment._id} data={comment} postId={id} />) : <p className='w-full text-center'>no comments</p>}
        </section>
    </>
  )
}

