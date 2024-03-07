import Head from 'next/head'
import React from 'react'

import { LoginForm } from '@/feature'

const Page = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <div className='w-full min-h-screen bg-slate-200 flex justify-center items-center'>
        <LoginForm />
      </div>
    </>
  )
}

export default Page