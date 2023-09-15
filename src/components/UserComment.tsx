import React from 'react'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface DataComment {
    comment: string;
}

export default function UserComment({ id, isOnComment = false, postId}: { id: string; isOnComment?: boolean, postId?: string }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<DataComment>();
    
    const queryClient = useQueryClient();

    const commentMutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    })

    const commentOnCommentMutation = useMutation({
        mutationFn:  createCommentOnComment,
        onSuccess: () => queryClient.invalidateQueries(['commentsOnComment', id])
    })

    function onSubmit(data: DataComment) {
        isOnComment ?
            commentOnCommentMutation.mutate({
            postId: postId as string,
            body: data.comment, 
            commentId: id
            }) :
            commentMutation.mutate({
            id: id,
            body: data.comment
            })
        reset();
    }
  return (
      
          <section className='font-georgia py-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 py-2">
                <label htmlFor="comment" hidden>Comment</label>
                <textarea {...register('comment')} id="comment" className="outline-none border text-sm border-black-brown bg-black-brown-dark rounded-lg resize-none p-2 focus:border-ivory" placeholder='Write a comment...'></textarea>
                <button type='submit' className='bg-ivory text-sm text-black-brown w-fit justify-self-end px-2 py-1 rounded hover:opacity-50'>Post Comment</button>
            </form>
          </section>
      
  )
}

async function createComment({ id, body, }: { id: string, body: string }) {
    const data = {
        body: body
    }
    try {
        const response = await axios.post(
            `https://blog-api-ol7v.onrender.com/v1/posts/${id}/comments`,
            data,
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

async function createCommentOnComment({ postId, body, commentId}: { postId: string, body: string, commentId: string }) {
    const data = {
        body: body
    }
    try {
        const response = await axios.post(
            `https://blog-api-ol7v.onrender.com/v1/posts/${postId}/comments/${commentId}`,
            data,
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