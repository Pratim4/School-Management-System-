"use client"
import React, { useEffect } from 'react'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


const Login = () => {

      const { isSignedIn, user, isLoaded } = useUser()
      const router =useRouter();

      useEffect(() => {
        const role =user?.publicMetadata.role;
        if(role){
            router.push(`/${role}`)
        }
      }, [user, router])
  return (
    <div className='h-screen flex items-center justify-center bg-[var(--secondary)]'>
        <SignIn.Root>
            <SignIn.Step name='start' className='bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2'>
                <h1 className='font-bold flex  items-center gap-2 self-center' >
                    <Image src='/logo.svg' alt='' width={40}  height={40} className='w-auto h-[50px]' />
                    </h1>
                <h2 className='text-gray-500'>Sign in to your account</h2>
                <Clerk.GlobalError className='text-sm text-red-500'/>
                <Clerk.Field name ="identifier" className='flex flex-col gap-2'>
                    <Clerk.Label className='text-xs text-gray-500'>Username</Clerk.Label>
                    <Clerk.Input  type='text' required className='p-2 rounded-md ring-1 ring-gray-300' />
                    <Clerk.FieldError/>
                </Clerk.Field>
                <Clerk.Field name ="password" className='flex flex-col gap-2'>
                    <Clerk.Label className='text-xs text-gray-500'>Password</Clerk.Label>
                    <Clerk.Input  type='password' required className='p-2 rounded-md ring-1 ring-gray-300'/>
                    <Clerk.FieldError className='text-sm text-red-500'/>
                </Clerk.Field>
                <SignIn.Action submit className='bg-blue-500 text-white rounded-md p-2 mt-4'>SignIn</SignIn.Action>
            </SignIn.Step>
        </SignIn.Root>
    </div>
  )
}

export default Login