import express,{Request,Response,Router} from 'express'
import noteModel from '../module/noteModule'

const router:Router = express.Router()

interface DBfile{
    title:string,
    content:string,
    tags:[]
}

router.post('/addnew',(req:Request,res:Response)=>{
    const data = req.body
    console.log(data)
    const dbfile:DBfile = {
        title:data.title,
        content:data.content,
        tags:data.tags
    }

    const addfile = new noteModel({
        history:[{
            title:dbfile.title,
            content:dbfile.content,
            date:new Date(),
        }],
        tags:dbfile.tags,
    })

    addfile.save()
        .then(result=>{
            console.log(result._id)
            res.json({
                DBID:result._id
            })
        })
})

export default router