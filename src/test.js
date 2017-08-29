function abc(a, b, cb) {
    setTimeout(function() {
        cb(a + b);
    }, 3000);
}

var fun = `function test(cb){
	abc(1,2,function(r){
		cb(r);
	});
};
test(function(result){
	console.log(result);
});`;

// eval(fun);

//解析函数
var templateHtml = "<%var abc=abc(m,2);%>";
var params = {
    resultName: "abc",
    funcName: "abc",
    params: ["1", "2"]
}

/**
 * 生成执行函数
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function genFunction(params, cb) {
    var funcBB = eval(params.resultName);
    return new funcBB(params.params[0], params.params[1], function(result) {
        console.log(result);
        cb(result)
    });

}

//执行函数获取结果
genFunction(params, function(result) {
    params.result = result;
    console.log(params)
    var data = {};
    data[params.funcName] = new Function("x", "y", "return " + params.result + ";");
    data.m = 1;
    console.log(data[params.funcName]())
})


//组装数据
var data = {};
// data[params.funcName] = new Function(params.params[0], params.params[1], "return " + params.result + "");
