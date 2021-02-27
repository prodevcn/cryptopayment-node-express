const randomFixedInteger = (len) => {
    return String(Math.floor(Math.pow(10, len-1) + Math.random() * (Math.pow(10, len) - Math.pow(10, len - 1) - 1 )));
};

const randomPassword = (max, min) => {
    var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
    var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    var randPassword = Array(randPwLen).fill(passwordChars).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;    
};

exports.randomFixedInteger = randomFixedInteger;
exports.randomPassword = randomPassword;