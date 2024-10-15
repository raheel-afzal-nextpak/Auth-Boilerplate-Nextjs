// pages/404.js

import { AppRoutes } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import { app_constants } from './constants'

export default function Page404() {
    const { page_not_found } = app_constants
    return (
        <>
            <div className='h-screen w-screen bg-gray-50 flex items-center'>
                <div className='container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700'>
                    <div className='w-full lg:w-1/2 mx-8'>
                        <div className='text-7xl text-green-500 font-dark font-extrabold mb-8'>
                            {' '}
                            {page_not_found.title}
                        </div>
                        <p className='text-2xl md:text-3xl font-light leading-normal mb-8'>
                            {page_not_found.desc}
                        </p>

                        <Link
                            href={AppRoutes.DASHBOARD}
                            className='px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700'
                        >
                            {page_not_found.redirect_to_home}
                        </Link>
                    </div>
                    <div className='w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12'>
                        <Image
                            src={page_not_found.image}
                            alt={page_not_found.image_alt}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
