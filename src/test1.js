function getData(a, b, c, cb) {
    setTimeout(function() {
        // console.log(a);
        // console.log(b);
        console.log(cb);
        cb(null, a + b + c);
    }, 3000);
}

function abx(a, b, cb) {
    setTimeout(function() {
        // console.log(a);
        // console.log(b);
        // console.log(cb);
        cb(null, a - b);
    }, 3000);
}


module.exports = {
    getData: getData,
    abx:abx
}
