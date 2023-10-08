import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SignImg from '../assets/sign_img.svg?react';
import {ArrowLongRightIcon, ArrowLongLeftIcon} from '@heroicons/react/24/outline'

interface userData {
  username: string;
  password: string;
}

export default function SignupForm() {
  const { handleSubmit, register, formState: {errors} } = useForm<userData>();

    const onSubmit = async (data: userData)  => {
        const user = {
            username: data.username,
            password: data.password
        }
        try {
            const response = await axios.post('https://blog-api-ol7v.onrender.com/v1/users/signup', user, {
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                }
            })

          if (response.data.code === 201) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.replace('/login'); 
            }
            
        } catch (err) {
            console.log(err);
        }
    }
  return (
      <main className='flex flex-col border-dashed border-2 border-ivory rounded-md'>
            <h1 className='text-4xl py-8 px-4'>
            /signup
            </h1>
                <hr />
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 w-full py-8 px-4'>
                    <div className='flex gap-2'>
                        <label htmlFor='username'>username:</label>
                        <input type="text" id="username" {...register('username')} className='text-ivory bg-transparent border-b border-ivory w-full focus:outline-none focus:ring ring-ivory hover:ring-1' autoComplete='username'/>
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor='password'>password:</label>
                        <input type="password" id="password" {...register('password')} className='text-ivory bg-transparent border-b border-ivory w-full focus:outline-none focus:ring ring-ivory hover:ring-1' autoComplete='new-password'/>
                    </div>
                    <button type='submit' className='flex items-center justify-center hover:bg-ivory hover:text-black-brown rounded py-2 text-lg font-bold'><ArrowLongRightIcon className='h-6 w-6'/>Sign up<ArrowLongLeftIcon className='h-6 w-6'/></button>
            </form>
          </main>
  )
}


/*
  <div className='hidden md:block scale-[2.5] translate-x-56 translate-y-60' >
            <SignImg />
          </div>
          */