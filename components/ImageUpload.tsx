"use client"
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
const authenticator = async()=>{
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`
                Request Failed with Status ${response.status} : ${errorText}`)
        }
        const data = await response.json();;
        const {signature , expire , token} = data;
        return{signature, expire, token}
    } catch (error : any) {
        throw new Error(`Authentication failed  ${error.message}`)
    }
}

const {env:{
    imageKit:{
        publicKey , privateKey , urlEndpoint
    }
}} = config
const ImageUpload = ({onFileChange} : {onFileChange :(filePath:string)=>void}) => {
    const ikUploadRef = useRef(null);
const [file, setfile] = useState<{filepath : string}| null>(null);
const onError =(error :any)=>{

};
const onSuccess =(res : any)=>{
    setfile(res);
    onFileChange(res.filePath);
}
  return (
  <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
    <IKUpload
   className='hidden'
   ref={ikUploadRef}
   onError={onError}
   onSuccess={onSuccess}
   fileName='test-upload.png'
    />
    <button className='upload-btn' onClick={(e)=>{
        e.preventDefault();
        if(ikUploadRef.current){
            //@ts-ignore
            ikUploadRef.current?.click();
        }
    }}>
        <Image src="/icons/upload.svg" alt='upload' width={20} height={20} className='object-contain'/>
        <p className='text-base text-light-100'>Upload a File</p>
        {file && <p className='upload-filename'>{file.filepath}</p>}
    </button>
    {file && (
        <IKImage
        alt={file.filepath}
        path={file.filepath}
        width={500}
        height={500}
/>
    )}
  </ImageKitProvider>
  )
}

export default ImageUpload