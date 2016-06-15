var fs = require('fs');
var request = require('request');

var commands = {
	pwd: function (arg, done) {
		var output = process.cwd()+'\n';
		done(output);
	},

	date: function (arg, done) {
		var output = Date()+'\n';
		done(output);
	},

	ls: function (arg, done) {
		var output = '';
		fs.readdir('.', function(err, files) {
			if (err) throw err;
			files.forEach(function(file) {
				output += file.toString() + "\n";
			})
			done(output);
		});
	},

	echo: function (text, done) {
		var output = text+'\n';
		done(output);
	},

	cat: function (fileName, done) {
		var output;
		fs.readFile('./' + fileName, function (err, data) {
			if (err) throw err;
			output = data;
			done(output);
		});
	},

	head: function (fileName, done) {
		var output;
		fs.readFile('./' + fileName, 'utf8', function (err, data) {
			if (err) throw err;
			var newData = data.split('\n').slice(0,5);
			output = newData.join('\n');
			done(output);
		});
	},

	tail: function (fileName, done) {
		var output;
		fs.readFile('./' + fileName, 'utf8',function (err, data) {
			if (err) throw err;
			var newData = data.split('\n');
			output = newData.slice(newData.length - 5).join('\n');
			done(output);
		});
	},

	sort: function (fileName, done) {
		var output;
		fs.readFile('./' + fileName, 'utf8',function (err, data) {
			if (err) throw err;
			var newData = data.split('\n');
			newData = newData.sort();
			output = newData.join('\n');
			done(output);
		});
	},

	wc: function (fileName, done) {
		var output;
		fs.readFile('./' + fileName, 'utf8',function (err, data) {
			if (err) throw err;
			var newData = data.split('\n');
			output = newData.length.toString();
			done(output);
		});
	},

	uniq: function (fileName, done) {
		var output;
		fs.readFile('./' + fileName, 'utf8',function (err, data) {
			if (err) throw err;
			var newData = data.split('\n');
			var result =[];
			for (var i = 0; i < newData.length; i++) {
				if(newData[i] !== newData[i+1]){
					result.push(newData[i]);
				}
			}
			output = result.join('\n');
			done(output);
		});
	},

	curl: function (url, done){
		var output;
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				output = body; // Show the HTML for the Google homepage.
			}
			done(output);
		});
	}
};

module.exports = commands;