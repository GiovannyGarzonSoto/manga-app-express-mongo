import {connect} from 'mongoose' 

export const connectDatabase = async() => {
    try{
        await connect(`mongodb+srv://${process.env.ATLAS_URI}/manga-app?retryWrites=true&w=majority`)
        console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}