import React, { useContext, useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LikesContext } from '../context/LikesContext';
import { likePost, likeComment, dislikePost, dislikeComment } from '../services/likeServices';

const queryClient = useQueryClient();

export const useLike = function({ id, isOnComment }: { id: string; isOnComment: boolean}){
    
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
      if (!likeStatus) {
        isOnComment ? likeCommentMutation.mutate({id}) : likePostMutation.mutate({id});
      } else {
        isOnComment ? dislikeCommentMutation.mutate({id}) : dislikePostMutation.mutate({id});
      }
    }
    
  const likeStatus = useMemo(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = window.localStorage.getItem('id');
      return state.likes.some((likes: any) => likes.author === userId);
    }
    }, [state.likes])
    return {
        handleClick, likeStatus
    }
}