import React, { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useStore } from '@nanostores/react';
import { user } from '../stores/userStore';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const initialState = {
  logged: false,
  username: null
}

export default function UserPanel() {
  //const [loginState, setLoginState] = useState(initialState); 
  const $user = useStore(user); 
  const [isLogged, setIsLogged] = useState(false);
  
  async function handleClick() {
    await axios.post(
      'https://blog-api-ol7v.onrender.com/v1/users/logout',
      null,
      {
        withCredentials: true
      });
    localStorage.clear();
    window.location.reload(); // tratar de cambiar esto, que solo recargue el component 
  }

  useEffect(() => {
    if (localStorage.getItem('user') === null) { 
      user.set(initialState);
      setIsLogged(false);
    } else {
      const localUser = JSON.parse(localStorage.getItem('user')!); 
      if (localUser.username && localUser.id) {
        user.set({ logged: true, username: localUser.username });
        setIsLogged(true);
      }
    } 
  }, [])
  return (
    <>
      {isLogged ?
        <div className='border border-ivory rounded-md p-1'>
          <p className='text-xs flex items-center gap-1'>
            you are logged as
            <span className='bg-ivory text-black-brown px-1 rounded'>{$user.username}</span>
            <button onClick={handleClick}><ArrowRightOnRectangleIcon className='h-3 w-3 text-red-500'/></button>
          </p>
      </div> :
        <div>
            <a href="/login" className="hover:underline">login</a>
          /<a href="/signup" className="hover:underline" >signup</a>
      </div>
      }
    </>
  )
}
