import fs from 'fs'
import jpeg from 'jpeg-js'

import {toGrayImg, toGrayScale, Padding} from "./utils/index.js";
import Conv from "./utils/convolution.js"
import {grayStatistic, hisEqu} from "./utils/grayStatistic.js";
import {checkImg} from "./utils/startServer.js";
import * as kernel from "./utils/kernels.js";

// read and encode img
let jpegData = fs.readFileSync('2.jpg');
let rawImageData = jpeg.decode(jpegData);
const {width, height} = rawImageData

let img = toGrayScale(rawImageData, width, height)
img = Conv(img, kernel.gaussian)
hisEqu(img)

console.log(grayStatistic(img))

img = toGrayImg(img)
let newJpegEncoded = jpeg.encode(img)
fs.writeFileSync('./output/test1.jpg', newJpegEncoded.data)
//
// checkImg('./output/aa.jpg')
