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
            this.child.on('exit'); 
            stdinStream.push(data);  
            stdinStream.push(null);   // (EOF)
            stdinStream.pipe(this.child.stdin);
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
        this.child.on('close', (data, singal) => {
            callback(data, singal); 
        });
    }
    error(callback) {
        this.child.on('error', (error) => {
            callback(error); 
        });
    }
    kill(){
        this.child.kill();
    }
    pause(){
    }
}
module.exports = FFmepg ;