var cl_gSubChildInstantiate = gClass + String.raw`
ChildInstantiate <: xClass {
  Main := Child+
Child := "{" kkind ":" KindName "," kname ":" ComponentName "}" ","? Code? Child?
  Code = dq "@" dq ":" vs ","? Code?
}
`;

var cl_fSubChildInstantiate =
      fClass
    + fIdentityIgnore
    + String.raw`
fSubChildInstantiate {
  Main [child+] = ‛«child»’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? Code? more?] = ‛«lv»
(let ((«ComponentName» (make-instance '«KindName» :parent self :name (format nil "~a-~a-~a" name "«KindName»" "«ComponentName»"))))
«Code»
«rv»
«more»)’

  Code [dq1 kat dq2 kcolon vs optComma? more?] = ‛«vs»«more»’

  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`;

function cl_fmtChildInstances (text, verbatim) {
    /*
... input ...
      {"kind":"Jello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"}, "@":«verbatim»
... transpiled to ...
(let ((cell_7 (make-instance 'Jello ...)))
  (let ((cell_8 (make-instance 'World ...)))
    «verbatim»))
     */
    let instantiations = '';
    let success = true;
    let expandedtext = `${text}, "@":${verbatim}`;
    success && ([success, instantiations, errormessage] = transpile (expandedtext, "ChildInstantiate", cl_gSubChildInstantiate, cl_fSubChildInstantiate, ohm, compilefmt));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}

