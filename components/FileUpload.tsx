"use client"
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"
import { cn } from '@/lib/utils';

const authenticator = async()=>{
    try {
        const response = await fetch(`https://localhost:3000/api/auth/imagekit`);
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
}} = config;
interface Props{
    type: 'image' | 'video';
    accept:string;
    folder:string;
    variant:'dark'|'light';
    placeholder:string;
     onFileChange : (filePath : string) => void;
     value?:string
 
}
const ImageUpload = ({ type ,  folder , variant , accept , placeholder, onFileChange , value} :Props) => {
      const { toast } = useToast()

    const ikUploadRef = useRef(null);
const [file, setfile] = useState<{filePath : string | null}>({filePath:value ?? null});
const [progress, setprogress] = useState(0);
const style ={
    button: variant === 'dark' ?'bg-dark-300' :'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100':'text-slate-500',
    text : variant === 'dark' ? 'text-light-100' :'text-dark-400'
}
const onError =(error :any)=>{
    console.error(error)
    toast({
          title: `${type} Upload Error`,
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
const onValidate  =(file : File)=>{
    if(type === "image"){
        if(file.size > 20 * 1024 * 1024){
            toast({
                title:"file size too large",
                description:"Image size should be less than 20MB",
                variant:"destructive"
            });
            return false;
        }
       
    }
     else if(type ==="video"){
             if(file.size > 50 * 1024 *1024){
                toast({
                    title:"file size too large",
                    description:"Video size should be less than 50MB",
                    variant:"destructive"
                });
                return false
             }
        }
        return true;
}
  return (
  <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
    <IKUpload
   className='hidden'
   ref={ikUploadRef}
   onError={onError}
   onSuccess={onSuccess}
   useUniqueFileName={true}
   validateFile={onValidate}
   onUploadStart={()=>setprogress(0)}
   onUploadProgress={({loaded , total})=>
    {
        const percent = Math.round((loaded/total)*100) 
    setprogress(percent)
    }}
    folder={folder}
    accept={accept}
    />
    <button className={cn('upload-btn' , style.button)}onClick={(e)=>{
        e.preventDefault();
        if(ikUploadRef.current){
            //@ts-ignore
            ikUploadRef.current?.click();
        }
    }}>
        <Image src="/icons/upload.svg" alt='upload' width={20} height={20} className='object-contain'/>
        <p className={cn('text-base' , style.placeholder)}>{placeholder}</p>
        {file && <p className={cn('upload-filename' , style.text)}>{file.filePath}</p>}
    </button>
    {progress > 0 && progress !== 100 && (
        <div className='w-full rounded-full bg-green-200'>
            <div className='progress' style={{width:`${progress}%`}}>
                {progress}%
            </div>
        </div>
    )}
    {file && (
        (type === 'image' ? (  <IKImage
        alt={file.filePath!}
        path={file.filePath!}
        width={500}
        height={300}
/>): type === 'video' ?(
<IKVideo
path={file.filePath!}
controls={true}
className='h-96 w-full '
/>
): null)
      
    )}
  </ImageKitProvider>
  )
}

export default ImageUpload