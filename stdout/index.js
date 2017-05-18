var FFmepg = require('./ff');
var args = ['test.js']; 
var ffmpeg = new FFmepg(args);

ffmpeg.stdout((data) => {
    console.log("stdout "+data);  
}); 
ffmpeg.stderr((data) => {
    console.log("stderr "+data); 
}); 
ffmpeg.close((data) => {
    console.log("close "+data); 
}); 
ffmpeg.error((data) => {
    console.log("error "+data); 
}); 
ffmpeg.write("console.log('Hello world');", (error)=>{
    console.log(error);
});