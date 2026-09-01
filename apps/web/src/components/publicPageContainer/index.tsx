'use client'
import React from 'react'
import { ClubImage } from '../image/image'

const PublicPagesContainer = ({ title, image, children }) => {
    return (
        <div className="w-full bg-[#D9D9D9] min-h-screen">
            <div className=" bg-gradient-main h-64 md:h-96"></div>
            <div className='w-full px-[5%]'>
                <div className="w-full px-6 relative mx-auto md:w-5/6 lg:w-3/4  flex flex-col  bg-white shadow mb-6 rounded-2xl justify-center pb-12 mt-[-6rem] md:mt-[-12rem]">
                    <div className='absolute  top-[-20rem] left-[35%] md:left-[42%] '>
                        <div className="mt-[15rem] w-[160px] h-[160px] rounded-full relative border-blue-400 border-2">
                            <ClubImage alt={title} localSrc={image} fill />
                        </div></div>
                    <div className="w-full mt-[6rem] px-[5%] md:mt-24 py-4 flex justify-center items-center  gap-4 mx-auto">
                        <div className="hidden  md:block  w-full">
                            <hr className=" border-blue-500 border-2 " />
                        </div>
                        <div className="lg:w-1/3 md:w-1/4 ">
                            <h3 className="text-blue-500 text-center">{title}</h3>
                        </div>
                        <div className="hidden sm:hidden md:block  w-full">
                            <hr className=" border-blue-500 border-2 " />
                        </div>
                    </div>
                    <div className="py-4 ">
                        {children}
                    </div>
                </div></div>
        </div>
    )
}

export default PublicPagesContainer