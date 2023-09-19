import React,{ useContext, useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LikesContext } from '../context/LikesContext';

export default function LikeCounter({ id, isOnComment }: { id: string, isOnComment: boolean }) {
    const likeQuery = useQuery({
        queryKey: isOnComment ? ['likes', id] : [ 'likes'],
        queryFn: () => isOnComment ? getCommentsLikes(id) : getPostLikes(id)
    });
    const { state, dispatch } = useContext(LikesContext);

    useEffect(() => {
        if (likeQuery.isSuccess) {
            const userId = localStorage.getItem('id');
            const likeStatus = likeQuery.data?.likes.some((likes: any) => likes.author === userId); 
            dispatch({ type: 'UPDATE_LIKES', payload: {count: likeQuery.data?.likes.length, status: likeStatus} })
            
       }
    }, [likeQuery.isSuccess])
 
   //const [totalLikes, setTotalLikes] = useState(likeQuery.data?.likes.length);

    return (
             <span>{state.likesCount}</span>
    )
}

// <span>{likeQuery.data?.likes.length}</span>

const getPostLikes = async (id: string) => {
    const response = await axios.get(`https://blog-api-ol7v.onrender.com/v1/posts/${id}/likes`); 
    const responseData = await response.data;
    return responseData;
}

const getCommentsLikes = async (id: string) => {
    const response = await axios.get(`https://blog-api-ol7v.onrender.com/v1/comments/${id}/likes/`); 
    const responseData = await response.data;
    return responseData;
}