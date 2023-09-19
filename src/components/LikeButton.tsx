import React, { useState, useContext, useEffect } from 'react'
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LikesContext } from '../context/LikesContext';

export default function LikeButton({ id, isOnComment}: { id: string, isOnComment: boolean}) {
  const queryClient = useQueryClient();
  const { state } = useContext(LikesContext);
  const [likeStatus, setLikeStatus] = useState(state.status);

  const likePostMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => queryClient.invalidateQueries(['likes'])
  })

  const likeCommentMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => queryClient.invalidateQueries(['likes', id])
  })

  const dislikePostMutation = useMutation({
    mutationFn: dislikePost,
    onSuccess: () => queryClient.invalidateQueries(['likes'])
  })

  const dislikeCommentMutation = useMutation({
    mutationFn: dislikeComment,
    onSuccess: () => queryClient.invalidateQueries(['likes', id])
  })


  function handleClick() {
    //setLikeStatus(prevState => !prevState);
    if (!likeStatus) {
      isOnComment ? likeCommentMutation.mutate({id}) : likePostMutation.mutate({id});
    } else {
      isOnComment ? dislikeCommentMutation.mutate({id}) : dislikePostMutation.mutate({id});
    }
  }
  
  useEffect(() => {
    setLikeStatus(state.status);
  }, [state.status])


  return (
    <button onClick={handleClick} type='button'>
      <HandThumbUpIcon className={`h-6 w-6 text-ivory hover:fill-ivory ${likeStatus && 'fill-ivory'}`} />
    </button>
  )
}

async function likePost({id} : { id: string}) {
  try {
    const response = await axios.post(
        `https://blog-api-ol7v.onrender.com/v1/posts/${id}/likes`,
        {},
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );
    const responseMessage = await response.data?.message;
    return responseMessage;
} catch (err) {
    console.log(err);
}
}

async function likeComment({id} : { id: string}) {
  try {
    const response = await axios.post(
        `https://blog-api-ol7v.onrender.com/v1/comments/${id}/likes`,
        {},
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );
    const responseMessage = await response.data?.message;
    return responseMessage;
} catch (err) {
    console.log(err);
}
}

async function dislikePost({id} : { id: string}) {
  try {
    const response = await axios.delete(
        `https://blog-api-ol7v.onrender.com/v1/posts/${id}/likes`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );
    const responseMessage = await response.data?.message;
    return responseMessage;
} catch (err) {
    console.log(err);
}
}

async function dislikeComment({id} : { id: string}) {
  try {
    const response = await axios.delete(
        `https://blog-api-ol7v.onrender.com/v1/comments/${id}/likes`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );
    const responseMessage = await response.data?.message;
    return responseMessage;
} catch (err) {
    console.log(err);
}
}