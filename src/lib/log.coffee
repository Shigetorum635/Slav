export class Logger
  @info: (arg, file, worker) -> 
    console.log(
      "[%c#{Date.now()}%c] - [%c#{file}%c] - [%cWorker::#{worker}%c] → %c#{arg}",
      "color:green;",
      "color:white",
      "color:red;",
      "color:white",
      "color:yellow;",
      "color:white;",
      "font-weight:bold"
    );
  
  @error: (arg, file, worker) -> 
    console.log(
      "ERROR: [%c#{Date.now()}%c] - [%c#{file}%c] - [%cWorker::#{worker}%c] → %c#{arg}",
      "color:green;",
      "color:white",
      "color:red;",
      "color:white",
      "color:yellow;",
      "color:white;",
      "font-weight:bold"
    )
  


Logger.info('lol', 'a','work')