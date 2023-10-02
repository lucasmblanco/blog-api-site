import React from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useLike } from '../hooks/LikeHook';

export default function LikeButton({ id, isOnComment}: { id: string, isOnComment: boolean}) {
  const { handleClick, likeStatus } = useLike({id, isOnComment}); 

  return (
    <button onClick={handleClick} type='button'>
      <HandThumbUpIcon className={`h-6 w-6 text-ivory hover:fill-ivory ${likeStatus && 'fill-ivory'}`} />
    </button>
  )
}

