import fs from 'fs'
import jpeg from 'jpeg-js'

import {
    toGrayImg,
    toGrayScale,
    Padding,
    imgAdding,
    imgDiff,
    nonMax,
    drawLine,
    DoG
} from "./utils/index.js";
import Conv from "./utils/convolution.js"
import {grayStatistic, hisEqu} from "./utils/grayStatistic.js";
import {checkImg} from "./utils/startServer.js";
import {Hough} from "./utils/Hough.js";
import * as kernel from "./utils/kernels.js";
import {LaplaceEx} from "./utils/kernels.js";

// node ./main.js 启动程序
let start = Date.now()

let img = toGrayScale('2.jpg')
DoG(img, 3, 8)


toGrayImg(img, './output/test.jpg')


console.log('cost ' + (Date.now() - start) / 1000 + 'sec')