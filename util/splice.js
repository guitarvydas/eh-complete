function splicein (json, insert) {
    let splicetext = `"@":${insert}\n"children":`
    let newtext = json.replace (/"children":/, splicetext);
    return newtext;
}
