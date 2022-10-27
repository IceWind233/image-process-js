export function grayStatistic(grayScale){
    let grayS = new Array(256).fill(0)
    grayScale.data.map(obj=>{
        grayS[obj] += 1
    })

    return grayS

}

// Histogram equalization
export function hisEqu(grayScale){
    const {data} = grayScale
    let grayS = grayStatistic(grayScale)
    let pxSum = grayScale.width * grayScale.height
    let L
    for (let i = grayS.length - 1; i > 0; i --){
        L = i
        if(grayS[i] !== 0)
            break
    }

    grayS = grayS.map(obj=> obj / pxSum)
    for (let i = 1; i < grayS.length; i ++){
        grayS[i] += grayS[i-1]
    }

    for (let i = 0; i < data.length; i ++){
        data[i] = parseInt(grayS[data[i]] * L)
    }

    return grayScale
}