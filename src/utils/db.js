var mysql = require('mysql');
var async = require('async');
var log = require("log4js").getLogger("mysql");
var pool = mysql.createPool({
    // host: "59.110.67.163",
    host: "localhost",
    user: "root",
    // password: "root",
    // password: "flashhand888",
    password: "",
    database: "datainfo",
    port: 3306,
    supportBigNumbers: true,
    dateStrings: true,
    // charset: 'UTF8MB4_GENERAL_CI',
    connectionLimit: 10
});

//执行sql语句的方法，包括增删改查
exports.execSql = function(sql, param, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接超时！");
            return callback(err, null);
        } else {
            if (!connection) {
                console.log(connection);
            }
            log.warn("sql语句", sql);
            log.warn("参数", param);
            connection.query(sql, param, function(error, results) {
                connection.release(); //关掉连接，释放资源
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, results);
                }
            });
        }
    });
};


/**
 * 事物对象
 * @param {[type]}   sql      [description]
 * @param {[type]}   params   [description]
 * @param {Function} callback [description]
 */
exports.addSqlTask = function(sql, params, callback) {
    if (callback) {
        return callback(null, {
            sql: sql,
            params: params
        });
    }
    return {
        sql: sql,
        params: params
    }
}

//执行事务的方法
exports.execTrans = function(sqlTask, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            console.log("数据库连接超时！");
            return callback(err, null);
        }
        conn.beginTransaction(function(err) {
            if (err) {
                log.error(err);
                return callback(err, null);
            }
            var sqlTaskFun = [];
            sqlTask.forEach(function(sqlTask) {
                var sql = sqlTask.sql;
                var params = sqlTask.params;
                var tempSqlTaskFun = function(cb) {
                    conn.query(sql, params, function(qerr, result) {
                        if (qerr) {
                            log.error(qerr);
                            conn.rollback(function() {
                                // throw qerr;//抛出异常
                                conn.release();
                                return callback(qerr, null);
                            });
                        } else {
                            // return cb(null, "success");
                            return cb(null, result);
                        }
                    });
                }
                sqlTaskFun.push(tempSqlTaskFun);
            });

            async.series(sqlTaskFun, function(err, result) {
                if (err) {
                    log.error(err);
                    conn.rollback(function(err) {
                        conn.release();
                        return callback(err, null);
                    })
                } else {
                    conn.commit(function(err, info) {
                        log.info(JSON.stringify(info));
                        if (err) {
                            conn.rollback(function(err) {
                                conn.release();
                                return callback(err, null);
                            })
                        } else {
                            log.info("transaction commit success!!!");
                            conn.release(); //关闭连接，释放资源
                            // callback(null, info);
                            callback(null, result);
                        }
                    });
                }
            });
        });
    });
}