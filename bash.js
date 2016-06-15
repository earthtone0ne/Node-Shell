var command = require('./commands');

function done (output) {
	process.stdout.write(output);
	process.stdout.write('prompt > ');
}


process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
	var input = data.toString().trim().split(' ');
	var cmd=input.shift();
	input = input.join(' ');
	command[cmd](input, done);
});
