import React from 'react'
import Image from "next/image";
import sampleImage from "../public/img/sample-image.jpeg"
export function Artical() {
  return (
     <div className="grid grid-cols-3 m-3 border-blue-600 rounded-lg lg:max-w-[800px] bg-[#f1f1f1] dark:bg-[#000] dark:shadow-[0_0_4px_0_rgba(255,255,255,0.4)] dark:border-none shadow-lg">
      <div className="col-span-2 row-span-2 rounded-tl-lg">
        <div className="flex flex-col h-40 justify-around pr-4 pb-4 pl-4 max-h-40 cursor-pointer">
          <div className="flex items-center">
            <Image className="w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-full mr-2 bg-white" src="/sample/avatar.png" alt="Avatar of User" />
            <h5 className="text-slate-500 max-sm:text-sm text-md dark:text-white max-md:text-[sm] font-medium">Aryan Thakor</h5>
            <Image className="w-5 h-5 ml-1" src="/sample/verified.png" alt="Verified Icon" />
          </div>
          <div className="flex items-center article-title">
            <h2 className="font-normal text-xl max-sm:text-sm">Sample Title</h2>
          </div>
        </div>
      </div>
      <div className="h-full d-flex items-center row-span-2 justify-center">
        <div className="h-full d-flex items-center justify-center cursor-pointer">
          <Image
          src={sampleImage}
          alt=""
          className="object-cover pt-[20px] max-h-[200px] max-sm:shadow-md max-sm:h-[50%] sm:h-[100%]"/>
       
        </div>
      </div>

      <div className="grid col-span-3">
        <div className="pl-4 pb-4 cursor-pointer hover:underline col-span-3 h-5 font-thin text-xs">Liked by Someone</div>
        <div className="p-[0.8rem] h-full col-span-3  flex items-center rounded-b-lg" style={{ borderTop: '1px solid #3d3d3d' }}>
          <div className="flex justify-between w-full">
            <ul className="flex space-x-10 reaction-icons">
              <div>
                <i className="fa-regular fa-thumbs-up"></i> 10
              </div>
              <div>
                <i className="fa-regular fa-share-from-square cursor-pointer"></i>
              </div>
              <div>
                <i className="fa-regular fa-comment"></i> 5
              </div>
            </ul>
            <div className="relative ml-auto z-10">
              <i className="fas fa-ellipsis-h cursor-pointer"></i>
              <div className="absolute right-0 w-48 bg-white border rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-500">
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">Share</a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">Edit</a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">Delete</a>
              </div>
            </div>
          </div>
        </div>
     
      </div>

    </div>
  )
}
