if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoUri: 'mongodb://stefan:1234@ds241055.mlab.com:41055/vidjot-frenzie'}
} else {
    module.exports = {mongoUri: 'mongodb://localhost/vidjot-dev'}
}