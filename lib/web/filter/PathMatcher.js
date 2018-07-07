"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_PATH_SEPARATOR = '/';
class PathMatcher {
    constructor() {
        this.pathSeparator = DEFAULT_PATH_SEPARATOR;
    }
    setPathSeparator(pathSeparator) {
        this.pathSeparator = pathSeparator || DEFAULT_PATH_SEPARATOR;
    }
    ;
    match(pattern, path) {
        return this.doMatch(pattern, path, true);
    }
    ;
    doMatch(pattern, path, fullMatch) {
        if (path.startsWith(this.pathSeparator) !== pattern.startsWith(this.pathSeparator)) {
            return false;
        }
        var pattDirs = pattern.split(this.pathSeparator);
        var pattIdxStart = 0, pattIdxEnd = pattDirs.length - 1;
        var pathDirs = path.split(this.pathSeparator);
        var pathIdxStart = 0, pathIdxEnd = pathDirs.length - 1;
        // Match all elements up to the first **
        while (pattIdxStart <= pattIdxEnd && pathIdxStart <= pathIdxEnd) {
            var patDir = pattDirs[pattIdxStart];
            if ('**' === patDir)
                break;
            if (!this.matchStrings(patDir, pathDirs[pathIdxStart])) {
                return false;
            }
            pattIdxStart++;
            pathIdxStart++;
        }
        if (pathIdxStart > pathIdxEnd) {
            // Path is exhausted, only match if rest of pattern is * or **'s
            let pathEndsWith_pathSeparator = path.endsWith(this.pathSeparator);
            if (pattIdxStart > pattIdxEnd) {
                return pattern.endsWith(this.pathSeparator) ? pathEndsWith_pathSeparator : !pathEndsWith_pathSeparator;
            }
            if (!fullMatch)
                return true;
            if (pattIdxStart === pattIdxEnd && pattDirs[pattIdxStart] === '*' && pathEndsWith_pathSeparator) {
                return true;
            }
            for (var i = pattIdxStart; i <= pattIdxEnd; i++) {
                if (pattDirs[i] !== '**')
                    return false;
            }
            return true;
        }
        else if (pattIdxStart > pattIdxEnd) {
            // String not exhausted, but pattern is. Failure.
            return false;
        }
        else if (!fullMatch && '**' === pattDirs[pattIdxStart]) {
            // Path start definitely matches due to '**' part in pattern.
            return true;
        }
        // up to last '**'
        while (pattIdxStart <= pattIdxEnd && pathIdxStart <= pathIdxEnd) {
            var parts = pattDirs[pattIdxEnd];
            if (parts === '**')
                break;
            if (!this.matchStrings(parts, pathDirs[pathIdxEnd]))
                return false;
            pattIdxEnd--;
            pathIdxEnd--;
        }
        if (pathIdxStart > pathIdxEnd) {
            // String is exhausted
            for (var j = pattIdxStart; j <= pattIdxEnd; j++) {
                if (pattDirs[j] !== '**')
                    return false;
            }
            return true;
        }
        while (pattIdxStart !== pattIdxEnd && pathIdxStart <= pathIdxEnd) {
            var patIdxTmp = -1;
            for (var k = pattIdxStart + 1; k <= pattIdxEnd; k++) {
                if (pattDirs[k] === '**') {
                    patIdxTmp = k;
                    break;
                }
            }
            if (patIdxTmp === pattIdxStart + 1) {
                // '**/**' situation, so skip one
                pattIdxStart++;
                continue;
            }
            // Find the pattern between padIdxStart & padIdxTmp in str between
            // strIdxStart & strIdxEnd
            var patLength = (patIdxTmp - pattIdxStart - 1);
            var strLength = (pathIdxEnd - pathIdxStart + 1);
            var foundIdx = -1;
            for (var l = 0; l <= strLength - patLength; l++) {
                for (var m = 0; m < patLength; m++) {
                    var subPat = pattDirs[pattIdxStart + m + 1];
                    var subStr = pathDirs[pathIdxStart + l + m];
                    if (!this.matchStrings(subPat, subStr)) {
                    }
                }
                foundIdx = pathIdxStart + l;
                break;
            }
            if (foundIdx === -1)
                return false;
            pattIdxStart = patIdxTmp;
            pathIdxStart = foundIdx + patLength;
        }
        for (var n = pattIdxStart; n <= pattIdxEnd; n++) {
            if (pattDirs[n] !== '**')
                return false;
        }
        return true;
    }
    ;
    matchStrings(pattern, str) {
        var patArr = pattern.split('');
        var strArr = str.split('');
        var patIdxStart = 0;
        var patIdxEnd = patArr.length - 1;
        var strIdxStart = 0;
        var strIdxEnd = strArr.length - 1;
        var ch;
        var containsStar = this.containsStar(pattern);
        if (!containsStar) {
            // No '*'s, so we make a shortcut
            // Pattern and string do not have the
            if (patIdxEnd !== strIdxEnd)
                return false; // same size
            for (var i = 0; i <= patIdxEnd; i++) {
                ch = patArr[i];
                if (ch !== '?') {
                    if (ch !== strArr[i])
                        return false; // Character mismatch
                }
            }
            return true; // String matches against pattern
        }
        if (patIdxEnd === 0) {
            return true; // Pattern contains only '*', which matches
            // anything
        }
        // Process characters before first star
        while ((ch = patArr[patIdxStart]) !== '*' && strIdxStart <= strIdxEnd) {
            if (ch !== '?') {
                if (ch !== strArr[strIdxStart]) {
                    return false; // Character mismatch
                }
            }
            patIdxStart++;
            strIdxStart++;
        }
        if (strIdxStart > strIdxEnd) {
            // All characters in the string are used. Check if only '*'s
            // are
            // left in the pattern. If so, we succeeded. Otherwise
            // failure.
            for (var j = patIdxStart; j <= patIdxEnd; j++) {
                if (patArr[j] !== '*')
                    return false;
            }
            return true;
        }
        // Process characters after last star
        while ((ch = patArr[patIdxEnd]) !== '*' && strIdxStart <= strIdxEnd) {
            if (ch !== '?') {
                if (ch !== strArr[strIdxEnd])
                    return false;
            }
            patIdxEnd--;
            strIdxEnd--;
        }
        if (strIdxStart > strIdxEnd) {
            // All characters in the string are used. Check if only '*'s
            // are
            // left in the pattern. If so, we succeeded. Otherwise
            // failure.
            for (var k = patIdxStart; k <= patIdxEnd; k++) {
                if (patArr[k] !== '*')
                    return false;
            }
            return true;
        }
        // process pattern between stars. padIdxStart and patIdxEnd
        // point
        // always to a '*'.
        while (patIdxStart !== patIdxEnd && strIdxStart <= strIdxEnd) {
            var patIdxTmp = -1;
            for (var l = patIdxStart + 1; l <= patIdxEnd; l++) {
                if (patArr[l] === '*') {
                    patIdxTmp = l;
                    break;
                }
            }
            if (patIdxTmp === patIdxStart + 1) {
                // Two stars next to each other, skip the first one.
                patIdxStart++;
                continue;
            }
            // Find the pattern between padIdxStart & padIdxTmp in str
            // between
            // strIdxStart & strIdxEnd
            var patLength = (patIdxTmp - patIdxStart - 1);
            var strLength = (strIdxEnd - strIdxStart + 1);
            var foundIdx = -1;
            strLoop: for (var m = 0; m <= strLength - patLength; m++) {
                for (var n = 0; n < patLength; n++) {
                    ch = patArr[patIdxStart + n + 1];
                    if (ch !== '?') {
                        if (ch !== strArr[strIdxStart + m + n]) {
                            continue strLoop;
                        }
                    }
                }
                foundIdx = strIdxStart + m;
                break;
            }
            if (foundIdx === -1)
                return false;
            patIdxStart = patIdxTmp;
            strIdxStart = foundIdx + patLength;
        }
        // All characters in the string are used. Check if only '*'s are
        // left
        // in the pattern. If so, we succeeded. Otherwise failure.
        for (var p = patIdxStart; p <= patIdxEnd; p++) {
            if (patArr[p] !== '*')
                return false;
        }
        return true;
    }
    ;
    containsStar(str) {
        var containsStar = false;
        if (str && str !== null) {
            for (var i = 0; i < str.length; i++) {
                if (str.charAt(i) === '*') {
                    containsStar = true;
                    break;
                }
            }
        }
        return containsStar;
    }
    ;
}
exports.PathMatcher = PathMatcher;
