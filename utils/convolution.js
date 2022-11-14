import {Padding} from "./index.js";

export default function Conv(grayScale, kernel, param = 1, isPadding = true) {
    const r = Math.floor(Math.sqrt(kernel.length) / 2)
    if (isPadding){
        grayScale = Padding(grayScale, r)
    }
    const {data, width, height} = grayScale
    const newWidth = width - 2 * r
    const newHeight = height - 2 * r

    const isConv = {
        width: newWidth,
        height: newHeight,
        data: []
    }

    for (let i = 0; i < newHeight; i++) {
        let buf = Buffer.alloc(newWidth)
        for (let j = 0; j < newWidth; j ++){
            let sum = 0
            for (let u = 0; u < 2 * r + 1; u ++){
                for (let v = 0; v < 2 * r + 1; v ++){
                    sum += data[i + u][j + v] * kernel[v + u * (2 * r + 1)]
                }
            }
            buf[j] = sum * param
        }
        isConv.data.push(buf)
    }

    return isConv

}