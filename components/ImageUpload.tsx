"use client"
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"

const authenticator = async()=>{
    try {
        const response = await fetch(`http://localhost:3000/api/auth/imagekit/`);
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`
                Request Failed with Status ${response.status} : ${errorText}`)
        }
        const data = await response.json();
        console.log(data);
        const {signature , expire , token} = data;
        return{signature, expire, token}
    } catch (error : any) {
        throw new Error(`Authentication failed  ${error.message}`)
    }
}

const {env:{
    imageKit:{
        publicKey , urlEndpoint
    }
}} = config
const ImageUpload = ({onFileChange} : {onFileChange :(filePath:string)=>void}) => {
      const { toast } = useToast()

    const ikUploadRef = useRef(null);
const [file, setfile] = useState<{filePath : string}| null>(null);
const onError =(error :any)=>{
    console.error(error)
    toast({
          title: "Image Upload Error",
          description: "Not Uploaded",
          variant:"destructive"
        })

};
const onSuccess =(res : any)=>{
    console.log(res)
    setfile(res);
    onFileChange(res.filePath);
    console.log(res.filePath)
    toast({
          title: "Image Upload Success",
          description:`${file?.filePath}`,
        })
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
        {file && <p className='upload-filename'>{file.filePath}</p>}
    </button>
    {file && (
        <IKImage
        alt={file.filePath}
        path={file.filePath}
        width={500}
        height={300}
/>
    )}
  </ImageKitProvider>
  )
}

export default ImageUpload