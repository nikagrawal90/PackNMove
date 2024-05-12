import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='flex items-center text-center bg-ccdaaf'>
        <div className='flex-1 mx-5 px-5 flex items-center'>
            <div className='inline-flex'>
                <img
                    src={"/favicon.ico"}
                    width={90}
                    height={90}
                    className='m-2 p-2'
                    alt='logo'
                />
            </div>
            <div className='inline-flex ml-2'>
                <span className='font-titillium-web'>
                    2024 PackNMove.com, Inc ™<br />
                    PackNMove.com Home Services, Inc., CA DRE # 01862195
                </span>
            </div>
        </div>
        <div className='flex-1 mx-5 px-5'>
            <FaTwitter className='inline-flex mx-2 cursor-pointer text-2xl text-gray-800' />
            <FaLinkedin  className='inline-flex mx-2 cursor-pointer text-2xl text-gray-800'/>
            <FaFacebook  className='inline-flex mx-2 cursor-pointer text-2xl text-gray-800'/>
            <FaYoutube  className='inline-flex mx-2 cursor-pointer text-2xl text-gray-800' />
        </div>
    </div>
  )
}

export default Footer