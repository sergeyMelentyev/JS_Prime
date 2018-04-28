function global() {
	global;						// global object
	process;					// shell environment, "process.env" get environment data
	// ivent stack == event loop
	}
function jsonServerIterateOverFolders(){
	// iterate over content of folder, filter out any files (not folders), return arr of folders names 
	const http = require("http"),
	fs = require("fs");
	function loadAlbumList(callback) {
		fs.readdir("albums", (err,files) => {
			if (err) {
				callback(err);
				return;
			}
			let dirs = [];
			let iterator = (index) => {
				if (index === files.length) {
					callback(null, dirs);
					return;
				}
				fs.stat("albums/" + files[index], (err,stats) => {
					if (stats.isDirectory()) {
						dirs.push(files[index]);
					}
					iterator(index + 1);
				});
			};
			iterator(0);
		});
	}
	function handleIncomingRequest(req,res) {
		loadAlbumList((err,albums) => {
			if (err) {
				res.writeHeader(500, {"Content-Type" : "application/json"});
				res.end(JSON.stringify({ code: "cant_load_albums", message: err.message }));
				return;
			}
			const output = {error: null, data : {albums: albums}};
			res.writeHeader(200, {"Content-Type" : "application/json"});
			res.end(JSON.stringify(output));
		});
	}
	const server = http.createServer(handleIncomingRequest);
	server.listen(8080);
	}
function debug() {
	// :> node debug name.js	// help, list(10), setBreakpoint(line), repl
	}
