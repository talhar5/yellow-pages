import React from 'react'
import { Link } from 'react-router-dom'

export default function NoLogin() {
    return (
        <div className='container-fluid mx-auto w-full m-6'>
            <div className='flex flex-col space-y-6 items-center justify-center sm:w-full md:w-[500px] w-[740px] mx-auto'>
                <h2
                    className='
                                font-black
                                text-5xl
                                text-gray-800
                                text-center
                                '
                >
                    <span className='sm:block md:block text-transparent bg-clip-text bg-gradient-to-tr from-[#43cea2] to-[#185a9d]'>CAPTURE.</span>
                    <span className='sm:block md:block text-transparent bg-clip-text bg-gradient-to-tr from-indigo-700 to-rose-600'>ORGANIZE.</span>
                    <span className='sm:block md:block text-transparent bg-clip-text bg-gradient-to-tr from-[#D1913C] to-[#FFD194]'>DISCOVER.</span>

                </h2>

                <p className='font-semibold text-gray-700 text-center'>
                    Empowering Your Note-Taking Experience. Capture your thoughts, organize your ideas, and discover the power of efficient note-taking. With Yellow Pages, streamline your productivity and never lose track of important information again. Unlock the potential of your notes with our intuitive platform designed to enhance your digital workspace.
                </p>
            </div>
        </div >
    )
}
