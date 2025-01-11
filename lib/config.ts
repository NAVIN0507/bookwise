const config ={
    env:{
        apiEndpoint:process.env.NEXT_PUBLIC_API_ENDPOINT!,
        imageKit:{
            urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            privateKey:process.env.IMAGEKIT_PRIVATE_KEY!,
        }
    }
}
export default config