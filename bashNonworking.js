var command = require('./commands');

function done (output) {
	if (nextFunc) {
		nextFunc(output, done);
	}
	process.stdout.write(output);
	
	process.stdout.write('\nprompt > ');
	nextFunc;
}

var nextFunc ;
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
	var input = data.toString().trim().split(' | ');
	//["cmd filename",'stdOut']
	nextFunc = input[1];
	input=input[0].split(' ');  
	var cmd=input.shift();
	input = input.join(' ');

	command[cmd](input, done);
});
