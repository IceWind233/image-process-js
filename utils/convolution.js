import {Padding} from "./index.js";

export default function Conv(grayScale, kernel, param = 1) {
    const r = parseInt(Math.sqrt(kernel.length)/2)

    grayScale = Padding(grayScale, r)

    const {data, width, height} = grayScale
    const newWidth = width - 2 * r
    const newHeight = height -  2 * r

    const isConv = {
        width: newWidth,
        height: newHeight,
        data: Buffer.alloc(newHeight * newWidth)
    }
    for (let i = 0; i < newHeight * newWidth; i ++){
        let sum = 0
        let index = parseInt(i/newWidth) * width + i % newWidth + width * r + r
        for (let j = 0; j < 2 * r + 1; j ++){
            for (let k = -r; k < r + 1; k ++){
                sum += data[index - (j - r) * width - k] * kernel[j]
            }
        }

        isConv.data[i] = sum*param
    }
    return isConv

}