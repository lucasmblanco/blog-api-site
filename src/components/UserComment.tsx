import React from 'react'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface DataComment {
    comment: string;
}

export default function UserComment({ id, isOnComment = false, postId}: { id: string; isOnComment?: boolean, postId?: string }) {

    const { register, handleSubmit, formState: { errors } } = useForm<DataComment>();
    
    const queryClient = useQueryClient();

    const commentMutation = useMutation({
        mutationFn: createComment,
        onSuccess: () =>queryClient.invalidateQueries(['comments'])
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
    }
  return (
      <>
          <hr></hr>
          <section>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
                <label className="text-sm" htmlFor="comment">what do you think? comment below 👇</label>
                <textarea {...register('comment')} id="comment" cols={30} rows={3} className="bg-black-brown rounded-lg resize-none p-1 active:border-ivory"></textarea>
                <button type='submit'>Post Comment</button>
            </form>
          </section>
      </>

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