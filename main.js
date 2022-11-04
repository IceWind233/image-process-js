import fs from 'fs'
import jpeg from 'jpeg-js'

import {
    toGrayImg,
    toGrayScale,
    Padding,
    imgAdding,
    nonMax
} from "./utils/index.js";
import Conv from "./utils/convolution.js"
import {grayStatistic, hisEqu} from "./utils/grayStatistic.js";
import {checkImg} from "./utils/startServer.js";
import * as kernel from "./utils/kernels.js";
import {LaplaceEx} from "./utils/kernels.js";

// node ./main.js 启动程序


let img = toGrayScale('2.jpg')
img = Conv(img, kernel.superGaussian, 0.4)
let img1 = Conv(img, kernel.xGrad, 1 / 16)
nonMax(img1)
let img2 = Conv(img, kernel.yGrad, 1 / 16)
nonMax(img2)
let img3 = Conv(img, LaplaceEx, 1 / 8)
nonMax(img3)
img = imgAdding(img1, img2)
// img = Conv(img, kernel.yGrad, 1 / 4)


//卷积 支持gaussian 3x3
//        bigGaussian 5x5
//        superGaussian 7x7
//  param 可以根据需求调整图像亮度 过暗过亮可以通过此处修改

// 直方图均衡

// checkImg('./output/aa.jpg')

toGrayImg(img1, './output/c1test.jpg')
toGrayImg(img2, './output/c2test.jpg')
toGrayImg(img3, './output/c4test.jpg')
toGrayImg(img, './output/c3test.jpg')