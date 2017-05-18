const spawn = require('child_process').spawn;
const options =  {
  encoding: 'utf8',
  timeout: 0, // If timeout is greater than 0, the parent will send the signal identified by the killSignal property (the default is 'SIGTERM') if the child runs longer than timeout milliseconds.
  maxBuffer: 200*1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
};
// Steam
const child = spawn('node', ['test.js'], options);
// Buffer
// const exec = require('child_process').exec;
var stream   = require('stream');
var stdinStream = new stream.Readable();


child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});


stdinStream.push(input);  
stdinStream.push(null);   // (EOF)
stdinStream.pipe(child.stdin);

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

child.on('error', (err) => {
  console.log('Failed to start child process.');
});

function write(input){
    stdinStream.push(input);  
    stdinStream.push(null);   // (EOF)
    stdinStream.pipe(child.stdin);
}


------------------------------------
var spawn = require('child_process').spawn;
var stream   = require('stream');
var stdinStream = new stream.Readable();
var options;
var child; 
class FFmepg {
    constructor(args, options){
        try{
            this.child = spawn('node', args, options);
        }catch(ex) {
            throw ex; 
        }
    }
    write(data, callback){
        try{
            stdinStream.push(data);  
            stdinStream.push(null);   // (EOF)
            stdinStream.pipe(child.stdin);
        }catch(ex){
            callback(ex); 
        }
    }
    stderr(callback){
        this.child.stderr.on('data', (data) => {
            callback(data); 
        });
    }
    stdout(callback){
        this.child.stdout.on('data', (data) => {
            callback(data); 
        });
    }
    close(callback){
        this.child.on('close', (data) => {
            callback(data); 
        });
    }
    error(callback) {
        this.child.on('error', (error) => {
            callback(error); 
        });
    }
}
module.exports = FFmepg ;

-------------------------------------------------
var spawn = require('child_process').spawn;
var stream   = require('stream');
var stdinStream = new stream.Readable();
var options;
var child; 
class FFmepg {
    constructor(args, stdout, err, stderr, close){
        try{
            this.child = spawn('node', args, options);
        }catch(ex) {
            throw ex; 
        }
        this.child.stdout.on('data', (data) => {
            stdout(data); 
        });
        this.child.on('error', (err) => {
            error(err); 
        });
        this.child.stderr.on('data', (data) => {
            stderr(data); 
        });
        this.child.on('close', (data) => {
            close(data); 
        });
    }
    write(data, callback){
        try{
            stdinStream.push(data);  
            stdinStream.push(null);   // (EOF)
            stdinStream.pipe(this.child.stdin);
        }catch(ex){
            callback(ex); 
        }
    }
}
module.exports = FFmepg ;
