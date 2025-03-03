"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    var options = "qwertyuiasdffhjkzxvbbvnm32455789";
    var length = options.length;
    var ans = "";
    for (var i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * length))];
    }
    return ans;
}
