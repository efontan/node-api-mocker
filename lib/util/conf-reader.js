const FS = require('fs');
function Conf() {
    this.conf = undefined;
    this.paths = [];
}



Conf.prototype.readConfig = _readConfigLog;

function _readConfigLog(configPath) {
    console.log('Conf.readConfig with', configPath);
    _readConfigValidate(configPath);
}

function _readConfigValidate(configPath) {
    var fileExists = false;
    var configValid = false;
    try {
        fs.accessSync(path, fs.F_OK);
        fileExists = true;
    } catch (e) { console.log('Conf.readConfig', e); }

    if (fileExists && configValid)
        _readConfig(configPath);

}

function _readConfig(configPath) {
    //TODO: Get the important parts out of the config
    //TODO: Map the paths 
}



module.exports = new Conf();