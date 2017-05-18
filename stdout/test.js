console.log("Hello World");
var count = 0; 
var time = setInterval(() => { if(count < 10) {console.log("Hello "+count++)} else {clearInterval(time)}}, 300);