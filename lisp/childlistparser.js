var cl_gSubChildList = gClass + String.raw`
ChildList <: xClass {
  Main := Child vs
}
`;

var cl_fSubChildList =
      fClass
    + fIdentityIgnore
    + String.raw`
fSubChildList {
  Main [child vs] = ‛«child»«vs»’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛«lv»«ComponentName»«rv» «more»’
  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`;

function cl_fmtChildList (text, insert) {
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildList", cl_gSubChildList, cl_fSubChildList, ohm, compilefmt));
    if (success) {
	return `«(let (-((-(children (list (-${instantiations}-)))-))-)\n${insert})»`;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}




