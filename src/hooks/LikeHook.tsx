import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LikesContext } from '../context/LikesContext';
import { likePost, likeComment, dislikePost, dislikeComment } from '../services/likeServices';

export const useLike = function ({ id, isOnComment }: { id: string; isOnComment: boolean }) {
    const [isLiked, setIsLiked] = useState(false);
    const queryClient = useQueryClient();
    const { state } = useContext(LikesContext);
  
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
      if (!isLiked) {
        isOnComment ? likeCommentMutation.mutate({id}) : likePostMutation.mutate({id});
      } else {
        isOnComment ? dislikeCommentMutation.mutate({id}) : dislikePostMutation.mutate({id});
      }
    }
    
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (window.localStorage.getItem('user') !== null) {
        const user = JSON.parse(window.localStorage.getItem('user')!);
       setIsLiked(state.likes.some((likes: any) => likes.author === user.id))
    }
     }
    }, [state.likes])
    return {
        handleClick, isLiked
    }
}