// selfkind mechanism ...

var selfkindstack = [];

function topselfkind () {
    return stacktop (selfkindstack);
}

function setselfkind (s) {
    settop (selfkindstack, pythonify (s));
    return '';
}

function resetselfkind () {
    stackreset (selfkindstack);
    return '';
}

  
