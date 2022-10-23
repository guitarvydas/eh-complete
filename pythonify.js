function pythonify (s) {
    var r = stripQuotes (s);
    var r_no_ws = r.replace (/ /g,'_')
    return r_no_ws;
}
