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

// Common.validatePassword(req, res, password, user.password, function(error, isvalid){
//     if(isvalid){
//            if (req.param('remember-me') == 'true'){
//                res.cookie('user', user.user, { maxAge: config.site.maxCookieAge });
//                res.cookie('pass', user.pass, { maxAge: config.site.maxCookieAge });
//            }
//            json.status='0';
//      json.result={'success' : 'Login Successfully', 'status' : 200};
//      req.session.user=user;
//      res.send(json);
//     } else {
//      json.status='0';
//      json.result={'fail' : 'Invalid Credentials', 'status' : 200};
//      res.send(json);
//     }
// });