var crypto              = require('crypto');

exports.generateSalt = _generateSalt;
exports.saltAndHash  =  _saltAndHash;
exports.md5 =  _md5;
exports.validatePassword = _validatePassword;

function _generateSalt() {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
};

function _md5(str) {
    var return_str = crypto.createHash('md5').update(str).digest('hex');
    return return_str;
};

function _saltAndHash(req, res, pass, callback) {
    var salt = exports.generateSalt();
    callback(salt + exports.md5(pass + salt));
};

function _validatePassword(req, res, plainPass, hashedPass, callback) {
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + exports.md5(plainPass + salt);
    callback(null, hashedPass === validHash);
};