/**
 * 利用 Object.prototype.toString.call( obj ) 判断 js 变量的数据类型
 */

var isString = function( obj ){
    return Object.prototype.toString.call( obj ) === '[object String]';
};

var isArray = function( obj ){
    return Object.prototype.toString.call( obj ) === '[object Array]';
};

var isNumber = function( obj ){
    return Object.prototype.toString.call( obj ) === '[object Number]';
};

// 利用闭包来提取公共部分
var isType = function( type ){
    return function( obj ){
        return Object.prototype.toString.call( obj ) === '[object '+ type +']';
    }
};

// 这有点像函数式编程里的柯里化
var isString = isType( 'String' );
var isArray = isType( 'Array' );
var isNumber = isType( 'Number' );


/**
 * 单例模式
 */
var getSingle = function( fn ) {
    var ret;
    return function(){
        return ret || ( ret = fn.apply( this, arguments ));
    }
}

var getScript = getSingle(function(){
    return document.createElement( 'script' );
});
var script1 = getScript();
var script2 = getScript();
alert ( script1 === script2 ); // 输出：true