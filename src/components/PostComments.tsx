import React from 'react'
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



export default function PostComments({id} : {id: string}) {
  const commentsQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      fetch(`https://blog-api-ol7v.onrender.com/v1/posts/${id}/comments`).then(res =>
        res.json()
      )
  });

  return (        
    <>
      <hr></hr>
        <section className='grid gap-2 font-georgia py-2'>
        {commentsQuery.data?.comments.length > 0 ? commentsQuery.data.comments.map((comment: CommentInterface) => <Comment key={comment._id} data={comment} postId={id} />) : <p>no comments</p>}
        </section>
    </>

  )
}

