"use client"

import EFORM from '@/components/Form/EForm';
import EINPUT from '@/components/Form/EInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { storeUserInfo } from '@/service/actions/auth.services';

import { userLogin } from '@/service/actions/userLogin';
import { loginValidationSchema } from '@/validations/auth';


import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


const login = () => {
    const router = useRouter()
    const[errors,setErrors] = useState('')
    const handleLogin = async(value:FieldValues)=>{
        try {
            const res = await userLogin(value)
            console.log(res?.data?.accessToken);
            if(res?.data?.accessToken){
                toast.success(res.message)
                storeUserInfo({accessToken:res?.data?.accessToken})
                router.push('/')

            }
            else{
                setErrors(res?.message)
            }
        } catch (error) {
            
        }
    }
    
    return (
        <div className='flex ' >
            
            <Card className='w-[550px]'>
                <CardTitle className='text-center font-bold'>Login</CardTitle>
               {errors&&  <p className='text-center bg-red-600 p-3 m-4 font-bold'>{errors}</p>}
                <CardContent>
                  <EFORM 
                  onSubmit={handleLogin}
                  resolver={zodResolver(loginValidationSchema)}
                  defaultValues={{
                    email: "abc@g.com",
                    password: "12345678",
                  }}
                  >
                    <EINPUT
                    type='email'
                    name='email'
                    placeholder='Enter Your Email'
                    label='Email'
                    />
                    <EINPUT
                    type='password'
                    name='password'
                    placeholder='Enter Your Password'
                    label='Password'
                    className='my-8'
                    />
                    <Button type='submit' className='w-full'>Login</Button>
                  </EFORM>
                </CardContent>
            </Card>
        </div>
    );
};

export default login;
