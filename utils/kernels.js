const gaussian = [
    0.0947416, 0.118318, 0.0947416,
    0.118318 , 0.147761, 0.118318,
    0.0947416, 0.118318, 0.0947416
]
const xGrad = [
     1,  2,  1,
     0,  0,  0,
    -1, -2, -1
]
const yGrad = [
    1, 0, -1,
    2, 0, -2,
    1, 0, -1
]

export {
    xGrad,
    yGrad,
    gaussian,
}