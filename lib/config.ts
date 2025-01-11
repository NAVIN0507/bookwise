const config ={
    env:{
        apiEndpoint:process.env.NEXT_PUBLIC_API_ENDPOINT!,
        imageKit:{
            urlEndpoint:'https://ik.imagekit.io/mnsnavin',
            publicKey:'public_KALsYmzE0AOK1pjnNsKfGrcFlkE=',
            privateKey:'private_VxrymIfUE6HADGnJ/Qw2AlBlvVk=',
        },
        databaseUrl : process.env.DATABASE_URL
    }
}
export default config