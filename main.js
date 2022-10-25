import fs from 'fs'
import jpeg from 'jpeg-js'

import {toGrayImg, toGrayScale} from "./utils/index.js";
import {checkImg} from "./utils/startServer.js";
import {gaussian} from "./utils/kernels.js";

// read and encode img
let jpegData = fs.readFileSync('1.jpg');
let rawImageData = jpeg.decode(jpegData);
const {width, height} = rawImageData


let img = toGrayImg(toGrayScale(rawImageData, width, height))

let newJpegEncoded = jpeg.encode(img)
fs.writeFileSync('./output/11.jpg', newJpegEncoded.data)

checkImg('./output/11.jpg')

console.log(img);

