export default function Conv(grayScale, kernel, param = 1) {
    const {data, width, height} = grayScale
    const newWidth = width - 2
    const newHeight = height - 2
    const r = parseInt(Math.sqrt(kernel.length))
    const isConv = {
        width: newWidth,
        height: newHeight,
        data: Buffer.alloc(newHeight * newWidth)
    }
    for (let i = 0; i < newHeight * newWidth; i ++){
        let index = parseInt(i/newWidth) * width + i % newWidth + width + 1
        isConv.data[i] =
            (data[index - width - 1] * kernel[0] +
            data[index - width    ] * kernel[1] +
            data[index - width + 1] * kernel[2] +
            data[index         - 1] * kernel[3] +
            data[index            ] * kernel[4] +
            data[index         + 1] * kernel[5] +
            data[index + width - 1] * kernel[6] +
            data[index + width    ] * kernel[7] +
            data[index + width - 1] * kernel[8])/param
    }
    return isConv

}