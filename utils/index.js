// to grayscale
export const toGrayScale = (rawImg, width, height) => {
    const grayScale = {
        width: width,
        height: height,
        data: Buffer.alloc(width * height)
    }
    const {data} = rawImg
    for (let i = 0; i < data.length; i += 4){
        let tmp = i/4
        grayScale.data[tmp] =
            data[i] * 0.2126 +
            data[i + 1] * 0.7152 +
            data[i + 2]  * 0.0722
    }
    return grayScale
}

//convert grayscale to img
export const toGrayImg = (grayScale) => {
    const {data, width, height} = grayScale
    const grayImg = {
        width,
        height,
        data: Buffer.alloc(width * height * 4)
    }
    const {data: imgData} = grayImg
    let i = 0
    while (i < width * height * 4){
        let tmp = i
        imgData[i++] = data[tmp/4]    // channel r
        imgData[i++] = data[tmp/4]    // channel g
        imgData[i++] = data[tmp/4]    // channel b
        imgData[i++] = 0xff         // channel alpha

    }

    return grayImg
}

//Padding
export const Padding = (grayScale, r) =>
{
    const {width, height, data} = grayScale

    const paddingImg = {
        width: width + 2 * r,
        height: height + 2 * r,
        data: Buffer.alloc((width + 2 * r) * (height + 2 * r))
    }

    for (let i = 0; i < height*width; i ++){
        let index = (width + 2 * r + 1) * r + parseInt(i / width) * (width + 2 * r) + i % width
        paddingImg.data[index] = data[i]
    }

    return paddingImg
}
