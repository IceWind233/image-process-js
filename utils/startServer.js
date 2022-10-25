import http from 'http'

import {readImg} from './fs_img.js'

// check img
export const checkImg = (path) => {
    http.createServer((request, response)=>{
        response.writeHeader(200, {'Content-Type' : 'image/jpeg'})
        if(request.url !== 'favicon.ico'){
            readImg(path, response)
            console.log('process end')
        }
    }).listen(8080)

    console.log('server running at http://localhost:8080')

}

