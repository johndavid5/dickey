/** REFERENCE: https://github.com/nomiddlename/log4js-node */
//var log4js = require('./lib/log4js-node/lib/log4js');
var log4js = require('log4js');

var util = require('util');

//util.inherits(Log4jsPlus, log4js);

//function Log4jsPlus(){
//	function info(msg){	
//		log4js.call(info, "[" + process.pid	+ "]" + msg );
//	}
//}

// Turn off colors...looks goofy in file...
//log4js.configure({ appenders: [ { type: "console", layout: { type: "basic" } } ], replaceConsole: true })

var moniker = "server" + "-" + process.pid;
var log_file_path = moniker + ".log";

log4js.configure({
		appenders: [
			{ type: "console" }, // Set to write to console...
			//{ type: 'file', filename: log_file_path, category: 'server' } // Set to append to file...
		],
		replaceConsole: true, // Replace console.log with logger.info()...
	}
);


//log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.file(log_file_path), 'server');

var logger = log4js.getLogger();

logger.setLevel('INFO');

//var logger = Log4jsPlus.getLogger();

module.exports = logger;
