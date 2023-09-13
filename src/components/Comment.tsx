import React, { useState }  from 'react'
import UserComment from './UserComment';

interface AuthorInterface {
  _id: string;
  username: string;
}
interface CommentInterface  {
  _id: string;
  on: string;
  onModel: string;
  author: AuthorInterface;
  body: string;
  timestamp: string;
  edited: boolean;
  deleted: boolean;
}

export default function Comment({ data }: { data: CommentInterface }) {
  const [response, setResponse] = useState(false);
  
  function handleClick() {
    setResponse(prevState => !prevState); 
  }

  return (
    <div>
      <p>{data.author.username}</p>
      <p>{data.body}</p>
      <button onClick={handleClick}>reply</button>
      {response && <UserComment id={data._id} isOnComment={true} />}
    </div>
  )
}
