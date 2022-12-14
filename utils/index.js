import jpeg from "jpeg-js";
import fs from "fs";
import Conv from "./convolution.js";
import {createGaussianKernel} from "./kernels.js";

/*
* to grayscale
* @param path the img u wanna decode to gray scale
* @param channel the channel of the img default is 4 and other number is not available
* */
export const toGrayScale = (path, channels = 4) => {
    let rawImg = jpeg.decode(fs.readFileSync(path))

    const {data, width, height} = rawImg
    let r = Buffer.alloc(width * height)
    const grayScale = {
        width: width,
        height: height,
        data: []
    }

    for (let i = 0; i < data.length; i += channels) {

        r[Math.floor(i / 4)] = (
            data[i] * 0.2126 +
            data[i + 1] * 0.7152 +
            data[i + 2] * 0.0722
        )
    }
    // transfer to 2d array
    for (let i = 0; i < height * width; i += width) {
        grayScale.data.push(r.slice(i, i + width))
    }
    return grayScale

}

// convert grayscale to img
// @param grayScale gray scale of img
// @param path output file ,default file is './'
// @param channel the channel of the img default is 4 and other number is not available
export const toGrayImg = (grayScale,
                          path = './Demo.jpg',
                          channels = 4) => {
    const {data, width, height} = grayScale
    const grayImg = {
        width,
        height,
        data: Buffer.alloc(width * height * channels)
    }
    const {data: imgData} = grayImg
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let index = (i * width + j) * channels
            imgData[index] = data[i][j]    // channel r
            imgData[index + 1] = data[i][j]    // channel g
            imgData[index + 2] = data[i][j]    // channel b
            imgData[index + 3] = 0xff          // channel alpha
        }
    }

    let newJpegEncoded = jpeg.encode(grayImg)
    fs.writeFileSync(path, newJpegEncoded.data)
}

//Padding
/*
* @param {number} r Math.floor(kernel's size/2)
*
*/
export const Padding = (grayScale, r) => {
    const paddingImg = {
        width: grayScale.width + 2 * r,
        height: grayScale.height + 2 * r,
        data: []
    }
    const {width, height, data} = grayScale
    for (let i = 0; i < r; i++) {
        data.unshift(Buffer.alloc(width))
        data.push(Buffer.alloc(width))
    }
    for (let i = 0; i < paddingImg.height; i++) {
        let buf = Buffer.alloc(paddingImg.width)
        data[i].copy(buf, r, 0)
        paddingImg.data.push(buf)
    }

    return paddingImg
}

//img add img
export const imgAdding = (img1, img2) => {
    const res = {
        width: img1.width,
        height: img1.height,
        data: []
    }

    for (let i = 0; i < res.height; i++) {
        let buf = Buffer.alloc(res.width)
        for (let j = 0; j < res.width; j++)
            buf[j] = Math.sqrt(img1.data[i][j] ** 2 + img2.data[i][j] ** 2)
        res.data.push(buf)
    }

    return res
}

//Difference of img
export const imgDiff = (img1, img2) => {
    const res = {
        width: img1.width,
        height: img1.height,
        data: []
    }

    for (let i = 0; i < res.height; i++) {
        let buf = Buffer.alloc(res.width)
        for (let j = 0; j < res.width; j++)
            buf[j] = Math.sqrt(Math.abs(img1.data[i][j] ** 2 - img2.data[i][j] ** 2))
        res.data.push(buf)
    }

    return res
}


export function nonMax(grayScale) {
    for (let i = 0; i < grayScale.height; i ++){
        for (let j = 0; j < grayScale.width; j++){
            grayScale.data[i][j] = grayScale.data[i][j] > 230 ? 255 : 0
        }
    }
}

export const drawLine = (grayScale, params) => {
    console.log(params)
    for (let i = 0; i < params.length; i ++){
        for (let x = 0; x < grayScale.width; x ++) {
            let y = params[i].a * x + params[i].b
            if ( x > 0 && x < grayScale.height ) {
                grayScale.data[x][y] = 255
            }
        }
    }
}


export const DoG = (grayScale, startSize, step) => {
    const {data, width, height} = grayScale
    const res = []
    const size = []
    size.push(startSize)
    for (let i = 0; i < 3; i ++){
        size.push(startSize += step)
    }
    let tmpGrayScale = grayScale, tmpGrayScale2 = grayScale
    for (let i = 0; i < 3; i ++){
        tmpGrayScale2 = Conv(grayScale, createGaussianKernel(size[i], 1), 1/2)
        res.push(imgDiff(tmpGrayScale, tmpGrayScale2))
        tmpGrayScale = tmpGrayScale2
    }
    const [bot, mid, top] = res
    for (let i = 1; i < height - 1; i ++){
        for (let j = 1; j < width - 1; j ++){
            // if (data[i][j] < 125) {
            //     data[i][j] = 0
            //     continue
            // }
            let cube = []
            for (let u = -1; u < 2; u ++){
                for (let v = -1; v < 2; v ++){
                    cube.push(top.data[i + u][j + v])
                    cube.push(mid.data[i + u][j + v])
                    cube.push(bot.data[i + u][j + v])
                }
            }
            cube.sort((a, b) => a - b)
            if ((mid.data[i][j] === cube[0] && cube[0] !== cube[1])){
                data[i][j] = 255
            }else{
                data[i][j] = 0
            }
            for (let i = 0; i < width; i ++){
                data[0][i] = 0
                data[height - 1][i] = 0
            }
            for (let i = 0; i < height; i ++){
                data[i][0] = 0
                data[i][width - 1] = 0
            }
        }
    }

}