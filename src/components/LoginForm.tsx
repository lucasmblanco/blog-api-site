import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

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
                localStorage.setItem('username', response.data.user.username); 
                window.location.replace('/'); 
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <div>
            <h1>
            LOG IN
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='username'>username</label>
                    <input type="text" id="username" {...register('username')} className='text-black'/>
                    <label htmlFor='password'>password</label>
                    <input type="text" id="password" {...register('password')} className='text-black'/>
                    <button type='submit'>Log in</button>
            </form>
        </div>
    </>
    )
}
