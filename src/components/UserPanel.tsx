import React, { useEffect, useState } from 'react'

export default function UserPanel() {
  const [loginState, setLoginState] = useState(false); 
  useEffect(() => {
    const username = localStorage.getItem('username'); 
    if (username) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [])
  return (
    <>
      {loginState ?
        <div className='border border-ivory rounded-md p-1'>
          <p className='text-xs'>
            you are logged as
            <span className='bg-ivory text-black-brown px-1 rounded'>{localStorage.getItem('username')}</span>
            <button>OUT</button>
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
