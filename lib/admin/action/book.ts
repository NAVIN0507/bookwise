"use server"
const createBook = async(params : BookParams)=>{
try {
    
} catch (error) {
    console.log(error)
    return {
        error:true,
        message:"Error creating in book"
    }
}
}