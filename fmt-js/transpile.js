// return 3 item from transpile
function transpile (src, grammarName, grammars, fmt, ohmlang, compfmt) {
    [matchsuccess, trgrammar, cst, errormessage] = patternmatch (src, grammarName, grammars, ohmlang);
    if (!matchsuccess) {
	return [false, "", "pattern matching error<br><br>" + errormessage];
    } else {
	[success, semanticsFunctionsAsString] = compfmt (fmt, ohmlang);
	if (!success) {
	    return [false, null, 'error compiling .fmt specification<br><br>' + err.message + ' ' + semanticsFunctionsAsString];
	}
	var evalableSemanticsFunctions = '(' + semanticsFunctionsAsString + ')';
	var sem = trgrammar.createSemantics ();
	try {
	    semobj = eval (evalableSemanticsFunctions);
	} catch (err) {
	    console.error (evalableSemanticsFunctions);
	    console.error (fmt);
	    return [false, null, 'error evaling .fmt specification<br><br>' + err.message];
	}
	try {
	    sem.addOperation ("_fmt", semobj);
	} catch (err) {
	    return [false, null, "error in .fmt specification<br><br>" + err.message];
	}
        var generatedFmtWalker = sem (cst);
        try {
	    //tracing = true;
	    var generated = generatedFmtWalker._fmt ();
	} catch (err) {
	    return [false, "", err.message];
	}
	return [true, generated, ""];
    }
}


function patternmatch (src, grammarName, grammars, ohmlang) {
    try {
	var grammarSpecs = ohmlang.grammars (grammars);
    } catch (err) {
	return [false, undefined, undefined, err.message];
    }
    try {
	var pmgrammar = grammarSpecs [grammarName];
    } catch (err) {
	return [false, undefined, undefined, `grammar ${grammarName} not found in given grammars`];
    }
    if (pmgrammar === undefined) {
	return [false, undefined, undefined, `grammar '${grammarName}' not found in given grammars`];
    }

    try {
	var cst = pmgrammar.match (src);
    } catch (err) {
	return [false, undefined, undefined, err.message];
    }
    if (cst.failed ()) {
	return [false, pmgrammar, cst, cst.message];
    } else { 
	return [true, pmgrammar, cst, ""];
    }
	
}


/// helpers
var tracing = false;

function _ruleInit () {
}

function traceSpaces () {
    var s = '';
    var n = traceDepth;
    while (n > 0) {
        s += ' ';
        n -= 1;
    }
    s += `[${traceDepth.toString ()}]`;
    return s;
}

function _ruleEnter (ruleName) {
    if (tracing) {
        traceDepth += 1;
        var s = traceSpaces ();
        s += 'enter: ';
        s += ruleName.toString ();
        console.log (s);
    }
}

function _ruleExit (ruleName) {
    if (tracing) {
        var s = traceSpaces ();
        traceDepth -= 1;
        s += 'exit: ';
        s += ruleName.toString ();
        console.log (s);
    }
}

function getFmtGrammar () {
    return fmtGrammar;
}

  // helper functions
  var ruleName = "???";
  function setRuleName (s) { ruleName = s; return "";}
  function getRuleName () { return ruleName; }

/// end helpers

