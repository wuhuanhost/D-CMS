

var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res){}).listen(50082);
console.log("http start");

 

var baseurl = "http://waptianqi.2345.com/images/w-day-l-140707@480/";
var index=10;
setInterval(function(){
	var url=baseurl+index+".png";
	http.get(url, function(res){
		var imgData = "";
		res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
		res.on("data", function(chunk){
			imgData+=chunk;
		});
		res.on("end", function(){
			fs.writeFile("./downImg/"+index+".png", imgData, "binary", function(err){
				if(err){
					console.log("down fail");
				}else{
					console.log("down success");
					index++;
				}
			});
		});
	});



},1000);


