import React from 'react'

export default function PostButtonComment({userStatus} : {userStatus: boolean}) {
  return (
    userStatus ? <button type='submit' className='bg-ivory text-sm text-black-brown w-fit justify-self-end px-2 py-1 rounded hover:opacity-50'>Post Comment</button> :
                    <p className='text-xs'>log to post a comment</p>
  )
}
