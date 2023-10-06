import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import LogImg from '../assets/log_img.svg?react';
import {ArrowLongRightIcon, ArrowLongLeftIcon} from '@heroicons/react/24/outline'

interface userData {
    username: string;
    password: string;
}

export default function loginForm() {
    const { handleSubmit, register, formState: {errors} } = useForm<userData>();

    const onSubmit = async (data: userData)  => {
        const user = {
            username: data.username,
            password: data.password
        }
        try {
            const response = await axios.post('https://blog-api-ol7v.onrender.com/v1/users/login', user, {
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (response.data.code === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.replace('/'); 
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
             <div className='grid border-dashed border-2 border-ivory rounded-md'>
            <h1 className='text-4xl py-8 px-4'>
            /login
            </h1>
                <hr />
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 w-full py-8 px-4'>
                    <div className='flex gap-2'>
                        <label htmlFor='username'>username:</label>
                        <input type="text" id="username" {...register('username')} className='text-ivory bg-transparent border-b border-ivory w-full outline-none' />
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor='password'>password:</label>
                        <input type="password" id="password" {...register('password')} className='text-ivory bg-transparent border-b border-ivory w-full outline-none'/>
                    </div>
                    <button type='submit' className='flex items-center justify-center hover:bg-ivory hover:text-black-brown rounded py-2 text-lg font-bold'><ArrowLongRightIcon className='h-6 w-6'/>Log in <ArrowLongLeftIcon className='h-6 w-6'/></button>
            </form>
            </div>
            <div className='hidden md:block'>
                <LogImg />
            </div>
        </>
    )
}
