import fs from 'fs'

export const readImg = (path, res)=>{
    fs.readFile(path, 'binary', (err, file)=>{
        if(err){
            console.log(err)
        }else{
            res.write(file, 'binary')
            res.end()
        }
    })
}

