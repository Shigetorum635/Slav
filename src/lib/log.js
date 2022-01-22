 export var Logger = class Logger {
  static info(arg, file, worker) {
    return console.log(`[%c${Date.now()}%c] - [%c${file}%c] - [%cWorker::${worker}%c] → %c${arg}`, "color:green;", "color:white", "color:red;", "color:white", "color:yellow;", "color:white;", "font-weight:bold");
  }

  static error(arg, file, worker) {
    return console.log(`ERROR: [%c${Date.now()}%c] - [%c${file}%c] - [%cWorker::${worker}%c] → %c${arg}`, "color:green;", "color:white", "color:red;", "color:white", "color:yellow;", "color:white;", "font-weight:bold");
  }

};

Logger.info('lol', 'a', 'work');


//# sourceMappingURL=log.js.map
//# sourceURL=coffeescript