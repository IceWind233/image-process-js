export const Hough = (grayScale, num) => {
    const pos = [] // store x & y
    const {width, height, data} = grayScale
    const dec = []
    const HoughMatrix = new Array(2 * height + 2)
        .fill(0).map(
            () => new Array(2 * height + 2).fill(0)
        )

    for (let i = 0; i < height; i ++) {
        for (let j = 0; j < width; j ++) {
            if (data[i][j] === 255) pos.push({x: j, y: i})
        }
    }
    //create coordinate frame
    // b convert to x axios and a convert to y, which is the param array
    pos.map(( posObj =>{
        if(posObj.x === 0);
        else{
            for (let b = 0; b < 2 * height; b ++) {
                let a = Math.floor(posObj.y / posObj.x - (b - height) / posObj.x )
                if( !(a > height || a < -height)) {
                    HoughMatrix[ a + height ][b] += 1
                }
            }
        }
    }))
    for (let i = 0; i < 2 * height; i ++) {
        for (let j = 0; j < 2 * height; j ++) {
            if ( HoughMatrix[j][i] !== 0 ) {
                dec.push({a: j - height, b: i - height, value: HoughMatrix[j][i]})
            }
        }
    }

    dec.sort((obj1, obj2) =>  obj2.value - obj1.value)
    const res = []
    for (let i = 0; i < dec.length / 2; i += Math.ceil(dec.length / 2 / num)){
        res.push(dec[i])
    }
    return res
}