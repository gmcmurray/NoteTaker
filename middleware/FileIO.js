const fs = require("fs");
const os = require("os");
function FileIO() {}

FileIO.prototype.read = function(file) {
  return fs.readFileSync(file, "utf8");
};

FileIO.prototype.write = function(path, data) {
  return fs.writeFileSync(path, data+os.EOL);
};

FileIO.prototype.append = function(file, data) {
  return fs.appendFileSync(file, data);
};

module.exports = FileIO;
