import mongoose from "mongoose";
import express, { json, Request,Response}  from 'express';
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as path from 'path'
import addNewFile from './router/addNewFile'
import cors from "cors"

interface config{
    database:{
        database_url:string,
        database_name:string
    }
}

const PORT = process.env.PORT ||3000

function readYamlFile(filePath: string): config {  
    try {  
        const abpath = path.resolve(filePath)
        console.log(abpath)
        const fileContents = fs.readFileSync(abpath, 'utf8');  
        const data = yaml.load(fileContents) as config;  
        return data;  
    } catch (e) {  
        console.error(e);  
        process.exit()  
    }  
} 

const config:config = readYamlFile('./config.yaml')


mongoose.connect(config.database.database_url+config.database.database_name).then(()=>{
    console.log("connected to DB")
})

const server = express()
server.use(json())
server.use(cors())

server.use("/api",addNewFile)

server.listen(PORT, () => {  
  console.log('\x1b[34m'+ `Server is running on port ${PORT}` +'\x1b[34m');  
}); 