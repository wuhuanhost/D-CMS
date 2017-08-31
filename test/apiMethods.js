exports.getData = function(cb) {
    var p1 = new Promise(test);
    var p2 = p1.then(function(result) {
        cb('成功：' + result);
    });
}


function test(resolve, reject) {
    setTimeout(function() {
        resolve("hello worldrwerew");
        console.log("dadsasdas");
    }, 1000);
}
