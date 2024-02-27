import React from 'react'
import './Options.css'

interface Props {
  title: string
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <>
      <section className='bg-gray-900 text-white'>
        <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
          <div className='mx-auto max-w-3xl text-center'>
            <h1 className='my-auto p-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
              Welcome to
              <span className='sm:block'>the Settings page</span>
            </h1>

            <p className='mx-auto max-w-xl sm:text-xl/relaxed'>
              Edit src/pages/Options/Options.tsx and save to reload.
            </p>

            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              <p className='text-4xl text-blue-400'>
                This page was styled with Tailwindcss
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Options
