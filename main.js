import fs from 'fs'
import jpeg from 'jpeg-js'

import {toGrayImg, toGrayScale, Padding} from "./utils/index.js";
import Conv from "./utils/convolution.js"
import {checkImg} from "./utils/startServer.js";
import * as kernel from "./utils/kernels.js";

// read and encode img
let jpegData = fs.readFileSync('3.jpg');
let rawImageData = jpeg.decode(jpegData);
const {width, height} = rawImageData

let img = Padding(toGrayScale(rawImageData, width, height))
img = Conv(img, kernel.superGaussian, 150)
// img = Conv(img, kernel.xGrad)
console.log(img)

img = toGrayImg(img)

let newJpegEncoded = jpeg.encode(img)
fs.writeFileSync('./output/33superGaussian.jpg', newJpegEncoded.data)
//
// checkImg('./output/aa.jpg')
