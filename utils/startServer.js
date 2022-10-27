import http from 'http'

import {readImg} from './fs_img.js'

// check img
export const checkImg = (imgPath) => {
    http.createServer((request, response)=>{
        response.writeHeader(200, {'Content-Type' : 'image/jpeg'})
        if(request.url !== 'favicon.ico'){
            readImg(imgPath, response)
            console.log('process end')
        }
    }).listen(8080)

    console.log('server running at http://localhost:8080')

}

