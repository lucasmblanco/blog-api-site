import React from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useLike } from '../hooks/LikeHook';

export default function LikeButton({ id, isOnComment, userIsLogged }: { id: string; isOnComment: boolean;  userIsLogged: boolean}) {
  const { handleClick, isLiked } = useLike({id, isOnComment}); 

  return (
    userIsLogged ? <button onClick={handleClick} type='button'>
    <HandThumbUpIcon className={`h-6 w-6 text-ivory hover:fill-ivory ${isLiked && 'fill-ivory'}`} />
    </button> : 
    <button type='button'>
      <HandThumbUpIcon className={`h-6 w-6 text-ivory `} />
    </button> 
    
  )
}

