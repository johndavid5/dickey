/**
* Dickey's cyool code to create a node cluster based on the
* CPU's available on your machine, originally named "boot.js".
*
* Originally used to test that notifications would occur properly
* on a cluster.
*
* "Simply put that into your codebase next to the server.js file and execute it.
* It will use Node Cluster to spawn up a new process for each CPU on your machine."
* Dickey, Jeff (2014-09-24).
* Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS, and Node.js (Develop and Design)
* (p. 137). Pearson Education. Kindle Edition. 
*
* PRETTY SOURCE: https://gist.github.com/dickeyxxx/f9f0109d43c734fcbdf2
* RAW SOURCE: https://gist.githubusercontent.com/dickeyxxx/f9f0109d43c734fcbdf2/raw/605a696e7479b851744e81b99f85e83ac606d036/boot.js
*/
'use strict';
var numCpus = require('os').cpus().length
var cluster = require('cluster')
require('./consolador'); // Override console.log() to prepend (<pid>) to message...

var sOuterWho = "cluster.js";

function inspectCPUs(){ 
	var sWho = sOuterWho + "::sWho";
	var cpus = require('os').cpus();
	console.log(sWho + "(): Looks like we've got ourselves " + cpus.length + " CPU" + (cpus.length!=1?"'s":"") + ", pardner" + (cpus.length!=0?":":".") );
	for( var i = 0; i < cpus.length; i++ ){
		console.log(sWho + "(): cpus[" + i + "] = ", cpus[i], ", pardner...");
	}
	console.log(sWho + "(): Let off some CPU's, Bennett!");
}

cluster.setupMaster({exec: __dirname + '/server.js'})

// workerIds returns the node cluster index for each worker
function workerIds() { return Object.keys(cluster.workers) }

// Gets the count of active workers
function numWorkers() { return workerIds().length }

var stopping = false

// Forks off the workers unless the server is stopping
function forkNewWorkers() {
  var sWho = "boot.js: forkNewWorkers";
  if (!stopping) {
    for (var i = numWorkers(); i < numCpus; i++) {
		console.log(sWho + "(): fork()-ing a new worker...");
		cluster.fork()
	}
  }
}

// A list of workers queued for a restart
var workersToStop = []

// Stops a single worker
// Gives 60 seconds after disconnect before SIGTERM
function stopWorker(worker) {
  console.log('stopping', worker.process.pid)
  worker.disconnect()
  var killTimer = setTimeout(function() {
    worker.kill()
  }, 60000)

  // Ensure we don't stay up just for this setTimeout
  killTimer.unref()
}

// Tell the next worker queued to restart to disconnect
// This will allow the process to finish it's work
// for 60 seconds before sending SIGTERM
function stopNextWorker() {
  var i = workersToStop.pop()
  var worker = cluster.workers[i]
  if (worker) stopWorker(worker)
}

// Stops all the works at once
function stopAllWorkers() {
  var sWho = sOuterWho + "::stopAllWorkers";
  stopping = true
  console.log('stopping all workers')
  workerIds().forEach(function (id) {
	console.log(sWho + "(): stopping worker[" + id + "]: ", cluster.workers[id], "...");
    stopWorker(cluster.workers[id])
  })
}

// Worker is now listening on a port
// Once it is ready, we can signal the next worker to restart
cluster.on('listening', stopNextWorker)

// A worker has disconnected either because the process was killed
// or we are processing the workersToStop array restarting each process
// In either case, we will fork any workers needed
cluster.on('disconnect', forkNewWorkers)

// HUP signal sent to the master process to start restarting all the workers sequentially
process.on('SIGHUP', function() {
  console.log('restarting all workers')
  workersToStop = workerIds()
  stopNextWorker()
})

// Kill all the workers at once
process.on('SIGTERM', stopAllWorkers)


inspectCPUs();

// Fork off the initial workers
console.log(sOuterWho + ": Calling forkNewWorkers()...");
forkNewWorkers()
console.log(sOuterWho + ': app master', process.pid, 'booted')

