var config = {
    ver: "1.0.0",
    urls: {
        pk10: "http://wwww",
        ssc: "http://wwww",
        k3: "http://wwww",
    },
    downloadURL: 'http://升级地址',
    host: 'http://www.data6688.com/',
    contact: {
        qq: "xxxxxxx",
        weixin: "xxxxx"
    },
    firstVer: function(ver) {
        if (!ver.toString().match(/^\d+\.\d+\.\d+$/)) {
            return 0
        }
        return parseInt(ver.split('.')[0]);
    },
    secondVer: function(ver) {
        if (!ver.toString().match(/^\d+\.\d+\.\d+$/)) {
            return 0
        }
        return parseInt(ver.split('.')[1]);
    },
    thirdVer: function(ver) {
        if (!ver.toString().match(/^\d+\.\d+\.\d+$/)) {
            return 0
        }
        return parseInt(ver.split('.')[2]);
    }
}

module.exports = config