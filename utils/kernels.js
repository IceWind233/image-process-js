const gaussian = [
    0.0947416, 0.118318, 0.0947416,
    0.118318 , 0.147761, 0.118318,
    0.0947416, 0.118318, 0.0947416
]

//param = 1/273
const bigGaussian = [
    1, 4,  7,  4,  1,
    4, 16, 26, 16, 4,
    7, 26, 41, 26, 7,
    4, 16, 26, 16, 4,
    1, 4,  7,  4,  1
]

const superGaussian = [
    0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067,
    0.00002292,	0.00078633,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
    0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
    0.00038771,	0.01330373,	0.11098164,	0.22508352,	0.11098164,	0.01330373,	0.00038771,
    0.00019117,	0.00655965,	0.05472157,	0.11098164,	0.05472157,	0.00655965,	0.00019117,
    0.00002292,	0.00078633,	0.00655965,	0.01330373,	0.00655965,	0.00078633,	0.00002292,
    0.00000067,	0.00002292,	0.00019117,	0.00038771,	0.00019117,	0.00002292,	0.00000067
]

const yGrad = [
     1,  2,  1,
     0,  0,  0,
    -1, -2, -1
]
const xGrad = [
    -1, 0,  1,
    -2, 0,  2,
    -1, 0,  1
]

const sharp = [
     0,  1,  0,
     1, -5,  1,
     0,  1,  0
]

const Laplace = [
    0,  1,  0,
    1, -4,  1,
    0,  1,  0
]

const LaplaceEx = [
    1,  1,  1,
    1, -8,  1,
    1,  1,  1
]

const bigLaplace = [
    0, 1, 1,   2,   2,   2, 1, 1, 0,
    1, 2, 4,   5,   5,   5, 4, 2, 1,
    1, 4, 5,   3,   0,   3, 5, 4, 1,
    2, 5, 3, -12, -24, -12, 3, 5, 2,
    2, 5, 0, -24, -40, -24, 0, 5, 2,
    2, 5, 3, -12, -24, -12, 3, 5, 2,
    1, 4, 5,   3,   0,   3, 4, 4, 1,
    1, 2, 4,   5,   5,   5, 4, 2, 1,
    0, 1, 1,   2,   2,   2, 1, 1, 0
]

const test = [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0
]


/*
 @params sigma standard deviation, size width of kernel
 */
const createGaussianKernel = (size, sigma = 1) => {
    let sum = 0
    const kernel = []
    for (let i = 0; i < size ** 2; i ++){
        let x = i % size
        let y = Math.floor(i / size)
        let u = -0.5 + (0.5 + x) / size
        let v = -0.5 + (0.5 + y) / size
        let r2 = u ** 2 + v ** 2
        let exp = -r2 / (2 * sigma ** 2)
        let deno = 2 * Math.PI * (sigma ** 2)
        let gaussian = Math.E ** exp / deno
        sum += gaussian
        kernel.push(gaussian)
    }

    // normalization
    return kernel.map(value => value / sum)
}

export {
    createGaussianKernel,
    xGrad,
    yGrad,
    gaussian,
    bigGaussian,
    superGaussian,
    sharp,
    Laplace,
    LaplaceEx,
    bigLaplace,
    test
}