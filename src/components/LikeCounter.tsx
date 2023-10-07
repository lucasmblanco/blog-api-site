import React,{ useContext, useEffect, useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LikesContext } from '../context/LikesContext';

export default function LikeCounter({ id, isOnComment }: { id: string, isOnComment: boolean }) {
    const [ likeCount, setLikeCount ] = useState(0);
    const { dispatch } = useContext(LikesContext);
    const likeQuery = useQuery({
        queryKey: isOnComment ? ['likes', id] : [ 'likes'],
        queryFn: () => isOnComment ? getCommentsLikes(id, dispatch) : getPostLikes(id, dispatch)
    });

    useEffect(() => {
        likeQuery.data && setLikeCount(likeQuery.data.likes.length); 
    }, [likeQuery.data])

    return (
             <span>{likeCount}</span>
    )
}

const getPostLikes = async (id: string, dispatch: any) => {
    const response = await axios.get(`https://blog-api-ol7v.onrender.com/v1/posts/${id}/likes`); 
    const responseData = await response.data;
    dispatch({ type: 'CONTENT_LIKES', payload: {likes: response.data?.likes} })
    return responseData;
}

const getCommentsLikes = async (id: string, dispatch: any) => {
    const response = await axios.get(`https://blog-api-ol7v.onrender.com/v1/comments/${id}/likes/`); 
    const responseData = await response.data;
    dispatch({ type: 'CONTENT_LIKES', payload: {likes: response.data?.likes} })
    return responseData;
}