import fs from 'fs'
import jpeg from 'jpeg-js'

import {
    toGrayImg,
    toGrayScale,
    Padding,
    imgAdding,
    nonMax,
    drawLine
} from "./utils/index.js";
import Conv from "./utils/convolution.js"
import {grayStatistic, hisEqu} from "./utils/grayStatistic.js";
import {checkImg} from "./utils/startServer.js";
import {Hough} from "./utils/Hough.js";
import * as kernel from "./utils/kernels.js";
import {LaplaceEx} from "./utils/kernels.js";

// node ./main.js 启动程序

let img = toGrayScale('2.jpg')

//卷积 支持gaussian 3x3
//        bigGaussian 5x5
//        superGaussian 7x7
//  param 可以根据需求调整图像亮度 过暗过亮可以通过此处修改
img = Conv(img, kernel.superGaussian, 0.4)
// let img2 = Conv(img, kernel.xGrad, 1/16)
// let img3 = Conv(img, kernel.yGrad, 1/16)
// nonMax(img2)
// nonMax(img3)
// img = imgAdding(img2, img3)
img = Conv(img, LaplaceEx, 1 / 8)
// img = Conv(img, kernel.LaplaceEx)
nonMax(img)
drawLine(img, Hough(img, 20))
// checkImg('./output/aa.jpg')
toGrayImg(img, './output/line.jpg')
// toGrayImg(img3, './output/testSobely.jpg')