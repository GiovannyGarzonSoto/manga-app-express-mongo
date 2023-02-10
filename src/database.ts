import {connect} from 'mongoose' 

export const connectDatabase = async() => {
    try{
        await connect(process.env.DATABASE)
        console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}