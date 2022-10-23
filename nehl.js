// node version ("neh") head code - makefile, "make neh"
// neh.js consists of 3 parts:
// 1. neh-head.js
// 2. eh-body.js
// 3. neh-tail.js

// (2) eh-body.js is generated from "eh.html" using "make eh-body.js"
// (1) and (3) have been manually created

// Ohm-JS
const ohm = require ('ohm-js')    

/// helpers
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

function compilefmt (fmtsrc, ohmlang) {
    // expand the string fmtsrc into JavaScript suitable for
    // inclusion as a semantic object for Ohm.js
    //
    var s = '';

    var generatedObject = {};
    

    // Step 1a. Create (internal) fmt transpiler. 
    var internalgrammar = ohmlang.grammar (fmtGrammar);
    var fmtcst = internalgrammar.match (fmtsrc);

    if (fmtcst.failed ()) {
        // return [false, "FORMAT: syntax error\n(Use Ohm-Editor to debug format specification (grammar: fmt.ohm))\n\n" + internalgrammar.trace (fmtsrc)];
	console.error (internalgrammar);
        return [false, "FORMAT: syntax error\n(Use Ohm-Editor to debug format specification (grammar: fmt.ohm)) rightmostPosition=" + fmtcst.getRightmostFailurePosition()];
    }
    // Step 1b. Transpile User's FMT spec to a JS object (for use with Ohm-JS)
    try {
        var sem = internalgrammar.createSemantics ();
        sem.addOperation ('_fmt', semObject);
        var generatedFmtWalker = sem (fmtcst);
        var generated = generatedFmtWalker._fmt ();
        return [true, generated];
    } catch (err) {
        var msg = "error generating code from FMT specification<br><br>" + err.message;
        return [false, msg];
    }
}


var tracing = false;
var traceDepth = 0;

const fmtGrammar =
      String.raw`
FMT {
top = spaces name spaces "{" spaces rule+ spaces "}" spaces more*
more = name spaces "{" spaces rule* spaces "}" spaces
rule = applySyntactic<RuleLHS> spaces "=" spaces rewriteString
RuleLHS = name "[" Param+ "]"
rewriteString = "‛" char* "’" spaces
char =
  | "«" nonBracketChar* "»" -- eval
  | ~"’" ~"]]" any     -- raw
nonBracketChar = ~"»" ~"«"  ~"’" ~"]]" any
name = letter nameRest*
nameRest = "_" | alnum
Param =
  | name "+" -- plus
  | name "*" -- star
  | name "?" -- opt
  | name     -- flat
comment = "//" (~"\n" any)* "\n"
space += comment
}
`;

function extractFormals (s) {
    var s0 = s
        .replace (/\n/g,',')
        .replace (/var [A-Za-z0-9_]+ = /g,'')
        .replace (/\._[^;]+;/g,'')
        .replace (/,/,'')
    ;
    return s0;
}

var varNameStack = [];

// xxx

//// top = spaces name spaces "{" spaces rule+ spaces "}" spaces more*
// top [ws1 name ws2 lb ws4 @rule ws5 rb ws3 @more] = [[{
// ${rule}
    // _terminal: function () { return this.sourceString; },
    // _iter: function (...children) { return children.map(c => c._fmt ()); },
    // spaces: function (x) { return this.sourceString; },
    // space: function (x) { return this.sourceString; }
// }
// ]]

const semObject = {

    top : function (_ws1,_name,_ws2,_lb,_ws4,_rule,_ws5,_rb,_ws3,_more) { 
        _ruleEnter ("top");

        var ws1 = _ws1._fmt ();
        var name = _name._fmt ();
        var ws2 = _ws2._fmt ();
        var lb = _lb._fmt ();
        var ws4 = _ws4._fmt ();
        var rule = _rule._fmt ().join ('');
        var ws5 = _ws5._fmt ();
        var rb = _rb._fmt ();
        var ws3 = _ws3._fmt ();
        var more = _more._fmt ().join ('');
        var _result = `{
${rule}${more}
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c._fmt ()); },
    spaces: function (x) { return this.sourceString; },
    space: function (x) { return this.sourceString; }
}
`; 
        _ruleExit ("top");
        return _result; 
    },

    more : function (_name,_ws2,_lb,_ws4,_rule,_ws5,_rb,_ws3) { 
        _ruleEnter ("top");

        var name = _name._fmt ();
        var ws2 = _ws2._fmt ();
        var lb = _lb._fmt ();
        var ws4 = _ws4._fmt ();
        var rule = _rule._fmt ().join ('');
        var ws5 = _ws5._fmt ();
        var rb = _rb._fmt ();
        var ws3 = _ws3._fmt ();
        var _result = `
${rule}
`; 
        _ruleExit ("top");
        return _result; 
    },


    ////
    
    // rule [lhs ws1 keq ws2 rws] = [[${lhs}${rws}
    // _ruleExit ("${getRuleName ()}");
    // },
    // ]]


    rule : function (_lhs,_ws1,_keq,_ws2,_rws) { 
        _ruleEnter ("rule");

        var lhs = _lhs._fmt ();
        var ws1 = _ws1._fmt ();
        var keq = _keq._fmt ();
        var ws2 = _ws2._fmt ();
        var rws = _rws._fmt ();
        var _result = `${lhs}${rws}
_ruleExit ("${getRuleName ()}");
},
`; 
        _ruleExit ("rule");
        return _result; 
    },
    ////
    
    // RuleLHS [name lb @Params rb] = [[${name}: function (${extractFormals(Params)}) {\n_ruleEnter ("${name}");${setRuleName (name)}${Params}
    // ]]
    RuleLHS : function (_name,_lb,_Params,_rb) { 
        _ruleEnter ("RuleLHS");

        var name = _name._fmt ();
        var lb = _lb._fmt ();
        var Params = _Params._fmt ().join ('');
        var rb = _rb._fmt ();
        var _result = `${name}: function (${extractFormals(Params)}) {\n_ruleEnter ("${name}");${setRuleName (name)}${Params}
`; 
        _ruleExit ("RuleLHS");
        return _result; 
    },
    
    ////


    // rewriteString [sb @cs se ws] = [[return \`${cs}\`;]]
    rewriteString : function (_sb,_cs,_se,_ws) { 
        _ruleEnter ("rewriteString");

        var sb = _sb._fmt ();
        var cs = _cs._fmt ().join ('');
        var se = _se._fmt ();
        var ws = _ws._fmt ();
        var _result = `return \`${cs}\`;`; 
        _ruleExit ("rewriteString");
        return _result; 
    },


    ////
    // char_eval [lb name rb] = [[\$\{${name}\}]]
    // char_raw [c] = [[${c}]]
    char_eval : function (_lb,_cs,_rb) { 
        _ruleEnter ("char_eval");

        var lb = _lb._fmt ();
        var name = _cs._fmt ().join ('');
        var rb = _rb._fmt ();
        var _result = `\$\{${name}\}`; 
        _ruleExit ("char_eval");
        return _result; 
    },
    
    char_raw : function (_c) { 
        _ruleEnter ("char_raw");

        var c = _c._fmt ();
        var _result = `${c}`; 
        _ruleExit ("char_raw");
        return _result; 
    },
    ////
    
    // name [c @cs] = [[${c}${cs}]]
    // nameRest [c] = [[${c}]]

    name : function (_c,_cs) { 
        _ruleEnter ("name");

        var c = _c._fmt ();
        var cs = _cs._fmt ().join ('');
        var _result = `${c}${cs}`; 
        _ruleExit ("name");
        return _result; 
    },
    
    nameRest : function (_c) { 
        _ruleEnter ("nameRest");

        var c = _c._fmt ();
        var _result = `${c}`; 
        _ruleExit ("nameRest");
        return _result; 
    },

    ////


    // Param_plus [name k] = [[\nvar ${name} = _${name}._fmt ().join ('');]]
    // Param_star [name k] = [[\nvar ${name} = _${name}._fmt ().join ('');]]
    // Param_opt [name k] = [[\nvar ${name} = _${name}._fmt ().join ('');]]
    // Param_flat [name] = [[\nvar ${name} = _${name}._fmt ();]]


    Param_plus : function (_name,_k) { 
        _ruleEnter ("Param_plus");

        var name = _name._fmt ();
        var k = _k._fmt ();
        var _result = `\nvar ${name} = _${name}._fmt ().join ('');`; 
        _ruleExit ("Param_plus");
        return _result; 
    },
    
    Param_star : function (_name,_k) { 
        _ruleEnter ("Param_star");

        var name = _name._fmt ();
        var k = _k._fmt ();
        var _result = `\nvar ${name} = _${name}._fmt ().join ('');`; 
        _ruleExit ("Param_star");
        return _result; 
    },
    
    Param_opt : function (_name,_k) { 
        _ruleEnter ("Param_opt");

        var name = _name._fmt ();
        var k = _k._fmt ();
        var _result = `\nvar ${name} = _${name}._fmt ().join ('');`; 
        _ruleExit ("Param_opt");
        return _result; 
    },
    
    Param_flat : function (_name) { 
        _ruleEnter ("Param_flat");

        var name = _name._fmt ();
        var _result = `\nvar ${name} = _${name}._fmt ();`; 
        _ruleExit ("Param_flat");
        return _result; 
    },
    
    ////

    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c._fmt ()); },
    spaces: function (x) { return this.sourceString; },
    space: function (x) { return this.sourceString; }
};
// yyy

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

  function stacktop (stack) {
      var len = stack.length;
      return stack [len - 1];
  }

  function stackpop (stack) {
      stack.pop ();
  }
  
  function stackreset (stack) {
      stack = [];
  }

  function settop (stack, val) {
      var len = stack.length;
      stack [len - 1] = val;
  }

  function panic (s) {
      var message = `panic: internal error ${s}`;
      throw message;
  }

/*
« xc2ab
⟨ x77e8
» xc2bb
⟩ x27e9
*/

/*
var lv = "\u{2039}"; //
var rv = "\u{203a}";//
*/

var lv = "\u{00ab}"; //
var rv = "\u{00bb}";//








function stripQuotes (s) {
    return s.replace (/"/g,'');
}

function pythonify (s) {
    var r = stripQuotes (s);
    var r_no_ws = r.replace (/ /g,'_')
    return r_no_ws;
}
 // pseudo Python to Python re-formatter
function indenter (str) {
    indentation = [];
    let result = '';
    if (str) {
	str.split ('\n').forEach (line => {
	    let s = indent1 (line);
	    result += '\n' + s;
	});
    }
    return result;
}

 let indentation = [];
 // we emit code using bracketed notation (- and -) which is compatible
 // lisp pretty-printing, which allows easier debugging of the transpiled code
 // then, for Python, we convert the bracketing into indentation...
 function indent1 (s) {
   let opens = (s.match (/\(-/g) || []).length;
   let closes = (s.match (/-\)/g) || []).length;
     // let r0 = s.trim ();
     let r0 = s;
   let r1 = r0.replace (/\(-/g, '');
   let r2 = r1.replace (/-\)/g, '');
   let spaces = indentation.join ('');
   let r  = spaces + r2.replace (/\n/g, spaces);
   let diff = opens - closes;
   if (diff > 0) {
       while (diff > 0) {
           indentation.push ('  ');
           diff -=1;
       }
   } else {
     while (diff < 0) {
         indentation.pop ();
         diff += 1;
     }
   }
   return r;
 }
 
function splicein (json, insert) {
    let splicetext = `"@":${insert}\n"children":`
    let newtext = json.replace (/"children":/, splicetext);
    return newtext;
}
  function removeVerbatimBrackets (s) {
      return s.replace (/«/g,'').replace (/»/g,'');
  }



  function fixupCode (s) {
      var fixed = s.replace (/,]/g,']').replace (/,\-\)]/g,'\n-)]').replace (/,⟩]\n]/g,']\n]').replace (/\n\n+/g, '\n');
      return fixed;
  }
// selfid2 mechanism ...

  var selfid2stack = [];
  
  function setSelfid2 (s) {
      settop (selfid2stack, s);
      return '';
  }

function maybeMapSelf (s) {
      var selfid2 = stacktop (selfid2stack);
      if (s === selfid2) {
	  return '"."';
      } else {
	  return s;
      }
  }

  function selfid2reset () {
      stackreset (selfid2stack);
      return '';
  }

  
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

  
const verbatimgrammar = String.raw`
Verbatim {
  Main = "<unused>"
  vs = verbatimspace*
  verbatimspace = lv recursiveverbatim+ rv spaces
  recursiveverbatim = recursiveverbatim_recur | recursiveverbatim_bottom
  recursiveverbatim_recur = lv recursiveverbatim+ rv
  recursiveverbatim_bottom = anythingVerbatim
  anythingVerbatim = anychar
  anything = anychar
  anychar= ~lv ~rv any

  lv = "\u{00ab}" // must correspond to definitions in chars.js
  rv = "\u{00bb}"
}
`;

  const dasgrammar = verbatimgrammar + String.raw`

DaS <: Verbatim {
Main := Components
Components = vs "[" vs Component+ vs "]" vs
Component = "[" ComponentJSON "]" ","?
ComponentJSON = ComponentLeafJSON | ComponentContainerJSON
ComponentContainerJSON = "{" NonEmptyChildren CField "}"
ComponentLeafJSON = "{" EmptyChildren CField "}"

EmptyChildren (EmptyChildren) = dq "children" dq ":" "[" "]" ","?
NonEmptyChildren (NonEmptyChildren) = dq "children" dq ":" ChildList ","?

CField =
  | dq "id" dq ":" string ","? CField?                   -- id
  | dq "inputs" dq ":" StringList ","? CField?           -- inputs
  | dq "name" dq ":" string ","? CField?                 -- name
  | dq "kind" dq ":" string ","? CField?                 -- kind
  | dq "outputs" dq ":" StringList ","? CField?          -- outputs
  | dq "synccode" dq ":" string ","? CField?             -- synccode
  | dq "connections" dq ":" ConnectionBody ","? CField?  -- connections
  | dq "@" dq ":" vs ","? CField?                        -- insert

ConnectionBody = "[" (Connection ","?)* "]"

Connection = "{" Receiver "," Sender "}"
Receiver = dq "receivers" dq ":" "[" "{" dq "receiver" dq ":" Pair "}" "]"
Sender = dq "senders" dq ":" "[" "{" dq "sender" dq ":" Pair "}" "]"

Pair = "{" kwcomponent ":" ComponentName "," kwport ":" PortName "}"
kwcomponent = dq "component" dq
kwport = dq "port" dq
ComponentName = string
PortName = string

ChildList = "[" Child "]"
Child = "{" kkind ":" KindName "," kname ":" ComponentName "}" ","? Child?
kkind = dq "kind" dq
KindName = string
kname = dq "name" dq


StringList = "[" vs (string ","?)* vs "]" vs
string (quoted string) = vs dq (~dq any)* dq vs
dq (dquote)= "\""
}
`;

const fVerbatim = String.raw`
Verbatim {
  vs [verbatimspaces*] = ‛«verbatimspaces»’
  verbatimspace [lv recursiveverbatim+ rv ws] = ‛«lv»«recursiveverbatim»«rv»«ws»’
  recursiveverbatim [x] = ‛«x»’
  recursiveverbatim_recur [lv recursiveverbatim+ rv] = ‛«lv»«recursiveverbatim»«rv»’
  recursiveverbatim_bottom [x] = ‛«x»’

  anythingVerbatim [c] = ‛«c»’
  anything [c] = ‛«c»’
  anychar [c] = ‛«c»’

  lv [c] = ‛«c»’
  rv [c] = ‛«c»’
}
`;
const fString = String.raw`
fString {
StringList [lb vs1 s* optcomma* vs2 rb vs3] = ‛«lb»«vs1»«s»«optcomma»«vs2»«rb»«vs3»’
string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«dq1»«c»«dq2»«vs1»’
dq [c] = ‛«c»’
}
`;

const fComponents = String.raw`
fComponents {
Components [vs0 lb vs1 Component+ vs2 rb vs3] = ‛«vs0»«lb»«vs1»«Component»«vs2»«rb»«vs3»’
}
`;

const fChild = String.raw`
fChild {
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛«lb»«kkind»«kcolon»«KindName»«kcomma»«kname»«kcolon»«ComponentName»«rb»«optcomma»«more»’
}
`;
const fInsert = String.raw`
fSelfDefs {
  SelfDef [kself keq ComponentName] = ‛.=«ComponentName»«setSelfid2 (ComponentName)»’
  SelfKind [kself keq kind Kind] = ‛.kind=«Kind»«setselfkind (Kind)»’
}
`;


  var selfid = undefined;
  var selfkind = undefined;

const dasfmt = String.raw`
DaS {
Component [lb ComponentJSON rb optcomma] = ‛\n.=«selfid»\n.kind=«selfkind»\n«lb»«ComponentJSON»«rb»«optcomma»’
ComponentJSON [x] = ‛«x»’
ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛«lb»«NonEmptyChildren»«ComponentField»«rb»’
ComponentLeafJSON  [lb EmptyChildren ComponentField rb] = ‛«lb»«EmptyChildren»«ComponentField»«rb»’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛\n«dq1»«kchildren»«dq2»«kcolon»«lb»«rb»«optcomma»’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n«dq1»«kchildren»«dq2»«kcolon»«ChildList»«optcomma»’

CField_id [dq1 k dq2 kcolon s kcomma? rec?] = ‛«selfid = s, ""»«rec»’
CField_inputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_name [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_kind [dq1 k dq2 kcolon s kcomma? rec?] = ‛«dq1»«k»«dq2»«kcolon»«s»«selfkind = s,""»«rec»’
CField_outputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_synccode [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_connections [dq1 k dq2 kcolon ConnectionBody kcomma? rec?] = ‛«dq1»«k»«dq2»«kcolon»«ConnectionBody»«rec»’
CField_insert [dq1 k dq2 kcolon vs kcomma? rec?] = ‛"@":«vs»«rec»’

ConnectionBody [lb Connection* optcomma* rb] = ‛«lb»«Connection»«rb»’

Connection [lb Receiver kcomma Sender rb] = ‛ «lb»«Receiver»,«Sender»«rb»’
Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«kreceivers»«dq2»«kcolon1»«lbracket»«lbrace»«dq3»«kreceiver»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«ksenders»«dq2»«kcolon1»«lbracket»«lbrace»«dq3»«ksender»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛«lb»«kwcomponent»«kcolon1»«ComponentName»«kcomma»«kwport»«kcolon2»«PortName»«rb»’
kwcomponent [dq1 kcomponent dq2] = ‛«dq1»«kcomponent»«dq2»’
kwport [dq1 kport dq2] = ‛«dq1»«kport»«dq2»’
ComponentName [s] = ‛«s»’
PortName [s] = ‛«s»’

ChildList [lb Child rb] = ‛«lb»«Child»«rb»’
Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛«lb»«kkind»«kcolon»«KindName»«kcomma»«kname»«kcolon»«ComponentName»«rb»«optcomma»«more»’
kkind [dq1 kkind dq2] = ‛«dq1»«kkind»«dq2»’
KindName [s] =  ‛«s»’
kname [dq1 kname dq2] = ‛«dq1»«kname»«dq2»’

}
` 
      + fComponents
      + fString
      + fVerbatim;


  const gSelfreplacer = dasgrammar + String.raw`
SelfReplacer <: DaS {
Component := SelfDef SelfKind ComponentDef
SelfDef = "." "=" ComponentName
SelfKind = "." "kind" "=" KindName
ComponentDef = "[" ComponentJSON "]" ","?
}
`;

const fSelfreplacer = String.raw`
SelfReplacer {
Component [SelfDef SelfKind ComponentDef] = ‛\n«SelfDef»\n«SelfKind»\n«ComponentDef»’
ComponentDef [lb ComponentJSON rb optcomma] = ‛«lb»«ComponentJSON»«rb»«optcomma»’
ComponentJSON [x] = ‛«x»’
ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛«lb»«NonEmptyChildren»«ComponentField»«rb»’
ComponentLeafJSON  [lb EmptyChildren ComponentField rb] = ‛«lb»«EmptyChildren»«ComponentField»«rb»’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛\n«dq1»«kchildren»«dq2»«kcolon»«lb»«rb»«optcomma»’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n«dq1»«kchildren»«dq2»«kcolon»«ChildList»«optcomma»’

CField_id [dq1 k dq2 kcolon s kcomma? rec?] = ‛«selfid = s, ""»«rec»’
CField_inputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_name [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_kind [dq1 k dq2 kcolon s kcomma? rec?] = ‛«dq1»«k»«dq2»«kcolon»«s»«rec»’
CField_outputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_synccode [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
CField_connections [dq1 k dq2 kcolon ConnectionBody kcomma? rec?] = ‛«dq1»«k»«dq2»«kcolon»«ConnectionBody»«rec»’
CField_insert [dq1 k dq2 kcolon vs kcomma? rec?] = ‛"@":«vs»«rec»’

ConnectionBody [lb Connection* optcomma* rb] = ‛«lb»«Connection»«rb»’

Connection [lb Receiver kcomma Sender rb] = ‛\n«lb»«Receiver»,«Sender»«rb»’
Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«kreceivers»«dq2»«kcolon1»«lbracket»«lbrace»«dq3»«kreceiver»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«ksenders»«dq2»«kcolon1»«lbracket»«lbrace»«dq3»«ksender»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛«lb»«kwcomponent»«kcolon1»«maybeMapSelf (ComponentName)»«kcomma»«kwport»«kcolon2»«PortName»«rb»’
kwcomponent [dq1 kcomponent dq2] = ‛«dq1»«kcomponent»«dq2»’
kwport [dq1 kport dq2] = ‛«dq1»«kport»«dq2»’
ComponentName [s] = ‛«s»’
PortName [s] = ‛«s»’

ChildList [lb Child rb] = ‛«lb»«Child»«rb»’
Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛«lb»«kkind»«kcolon»«KindName»«kcomma»«kname»«kcolon»«ComponentName»«rb»«optcomma»«more»’
kkind [dq1 kkind dq2] = ‛«dq1»«kkind»«dq2»’
KindName [s] =  ‛«s»’
kname [dq1 kname dq2] = ‛«dq1»«kname»«dq2»’

}
` 
      + fComponents
      + fString
      + fInsert
      + fVerbatim;
  const gIdentityEmitter = dasgrammar + String.raw`
IdentityEmitter <: DaS {
  Component := SelfDef SelfKind ComponentDef
  SelfDef = "." "=" ComponentName
  SelfKind = "." "kind" "=" ComponentName
  ComponentDef = vs "[" vs ComponentJSON vs "]" vs ","?
  ComponentName := 
    | dq "." dq -- self
    | string    -- name
}
`;

const fIdentityEmitter =
        fComponents
      + fInsert
      + fString
      + fVerbatim
      + String.raw`
IdentityEmitter {
Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛\n(K)«vs1»«vs2»«Component»«vs3»«vs4»«resetselfkind ()»(k)’
SelfDef [kdot keq ComponentName] = ‛XXX’
SelfKind [kdot kkind keq ComponentName] = ‛«setselfkind (ComponentName)»’
Component [SelfDef SelfKind ComponentDef] = ‛\n«SelfDef»\n«SelfKind»\n«ComponentDef»’
ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n(L)«vs1»«vs2»«ComponentJSON»«vs3»«vs4»(l)’
ComponentJSON [x] = ‛\n(Z)«x»(z)’
ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛\n(Y)«NonEmptyChildren»«ComponentField»(y)’
ComponentLeafJSON  [lb EmptyChildren ComponentField rb] = ‛«EmptyChildren»«ComponentField»’

EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛\n(H)(h)’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n(J)«ChildList»(j)’

CField_id [dq1 k dq2 kcolon s kcomma? rec?] = ‛\n(A)«panic ("phase2 id")»(a)’
CField_inputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛\n(B)«rec»(b)’
CField_name [dq1 k dq2 kcolon s kcomma? rec?] = ‛\n(C)«rec»(c)’
CField_kind [dq1 k dq2 kcolon s kcomma? rec?] = ‛\n(D)«rec»(d)’
CField_outputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛\n(E)«rec»(e)’
CField_synccode [dq1 k dq2 kcolon s kcomma? rec?] = ‛\n(F)«rec»(f)’
CField_connections [dq1 k dq2 kcolon ConnectionBody kcomma? rec?] = ‛\n(G)«ConnectionBody»«rec»(g)’
CField_insert [dq1 k dq2 kcolon vs kcomma? rec?] = ‛\n«vs»«rec»’

ConnectionBody [lb Connection* optcomma* rb] = ‛\n(T)«Connection»(t)’

Connection [lb Receiver kcomma Sender rb] = ‛\n(M)«Sender»;«Receiver»(m)’

Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛\n(N)«Pair»(n)’
Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛\n(O)«Pair»(o)’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛\n(P)«ComponentName»%«PortName»(p)’

kwcomponent [dq1 kcomponent dq2] = ‛«dq1»«kcomponent»«dq2»’
kwport [dq1 kport dq2] = ‛«dq1»«kport»«dq2»’
ComponentName_self [q1 s q2] = ‛«q1»«s»«q2»’
ComponentName_name [s] = ‛\n(S)«s»(s)’
PortName [s] = ‛\n(R)«s»(r)’

ChildList [lb Child rb] = ‛\n(U)«Child»(u)’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛\n(Q)«KindName»@«ComponentName»«more»(q)’
kkind [dq1 kkind dq2] = ‛«dq1»«kkind»«dq2»’
KindName [s] =  ‛«s»’
kname [dq1 kname dq2] = ‛«dq1»«kname»«dq2»’
}

`
;

const fIdentityIgnore = String.raw`
Ignore {
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n«vs1»«vs2»«ComponentJSON»«vs3»«vs4»’
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛«vs1»«vs2»«Component»«vs3»«vs4»«resetselfkind ()»’
  SelfDef [kdot keq ComponentName] = ‛’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛«vs1»«vs2»«ComponentJSON»«vs3»«vs4»’
  ComponentJSON [x] = ‛«x»’
  ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛«NonEmptyChildren»«ComponentField»’

  EmptyChildren [dq1 kchildren dq2 kcolon lb rb optcomma?] = ‛’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛«ChildList»’

  CField_id [dq1 k dq2 kcolon s kcomma? rec?] = ‛«panic ("phase2 id")»’
  CField_inputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
  CField_name [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
  CField_kind [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
  CField_outputs [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
  CField_synccode [dq1 k dq2 kcolon s kcomma? rec?] = ‛«rec»’
  CField_connections [dq1 k dq2 kcolon ConnectionBody kcomma? rec?] = ‛«ConnectionBody»«rec»’
  CField_insert [dq1 k dq2 kcolon vs kcomma? rec?] = ‛«rec»’

  ConnectionBody [lb Connection* optcomma* rb] = ‛«Connection»’

  Connection [lb Receiver kcomma Sender rb] = ‛’
  Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛«Pair»’
  Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛«Pair»’

  Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛’
ComponentName_name [s] = ‛«s»’
PortName [s] = ‛«s»’

ChildList [lb Child rb] = ‛«Child»’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛«more»’
}
`;
  const gChildImports = gIdentityEmitter + String.raw`
ChildImports <: IdentityEmitter {
}
`;

const fChildImports =
        fIdentityEmitter
      + fIdentityIgnore
+ `
fOverride {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛«vs1»«vs2»«Component»«vs3»«vs4»’
  Component [SelfDef SelfKind ComponentDef] = ‛\n«ComponentDef»’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n«vs1»«vs2»«ComponentJSON»«vs3»«vs4»’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛\n«lv»from «KindName» import «KindName»«rv»«more»’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛«ChildList»’
  ChildList [lb Child rb] = ‛«Child»’
  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`
;
  var gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var fClass =
    fIdentityEmitter
    + fIdentityIgnore
+ String.raw`
override {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛«vs1»«vs2»«Component»«vs3»«vs4»«resetselfkind ()»’
  Component [SelfDef SelfKind ComponentDef] = ‛\n«ComponentDef»’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n«vs1»«vs2»«ComponentJSON»«vs3»«vs4»’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛«lb»«kkind»«kcolon1»«KindName»«kcomma»«kname»«kcolon2»«ComponentName»«rb»«optComma»«more»’
  ComponentJSON [x] = ‛«x»’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛«ChildList»’
  ChildList [lb Child rb] = ‛«fmtChild (Child)»’
  ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛\nclass «topselfkind ()» (Container): (-
def __init__ (self, parent, name):(-
«NonEmptyChildren»
«ComponentField»
super ().__init__ (parent, name, self._children, self._connections)
-)-)’
  ComponentLeafJSON  [lb EmptyChildren ComponentField rb] = ‛’

CField_connections [dq1 k dq2 kcolon ConnectionBody kcomma? rec?] = ‛«lv»self._connections = [(-«ConnectionBody»-)]«rv»«rec»’
ConnectionBody [lb Connection* optcomma* rb] = ‛«fmtConnections (Connection)»’
Connection [lb Receiver kcomma Sender rb] = ‛«lb»«Receiver»«kcomma»«Sender»«rb»’

Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«kreceivers»«dq2»«kcolon1»«lbracket»«lbrace»«dq3»«kreceiver»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’

Sender [dq1 ksenders dq2 kcolon1 klbracket klbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«ksenders»«dq2»«kcolon1»«klbracket»«klbrace»«dq3»«ksender»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛«lb»«kwcomponent»«kcolon1»«ComponentName»«kcomma»«kwport»«kcolon2»«PortName»«rb»’

}
`;

/* Child formatter
   parses: {"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}
   used twice:
   1. parse child string and return
      cell_7 = Hello (...)
      cell_8 = World (...)

   2. parse child string and return
      self.children = [cell_7, cell_8]
*/


// 1.
// #include "childinstanceparser.js"

// 2.
// #include "childlistparser.js"


/* calls sub-parsers and sub-fmts to format child lists */
function fmtChild (text) {
    var instances = fmtChildInstances (text);
    var childList = fmtChildList (text);
    return `${instances}\n${lv}self._children = [${childList}]${rv}`;
}

var gSubChildInstantiate = gClass + String.raw`
ChildInstantiate <: xClass {
  Main := Child+
}
`;

var fSubChildInstantiate =
      fClass
    + fIdentityIgnore
    + String.raw`
fSubChildInstantiate {
  Main [child+] = ‛«child»’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛\n«lv»«ComponentName» = «KindName» (self, f'{name}-«KindName»-«ComponentName»');«rv»«more»’
  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`;

function fmtChildInstances (text) {
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildInstantiate", gSubChildInstantiate, fSubChildInstantiate, ohm, compilefmt));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}

var gSubChildList = gClass + String.raw`
ChildList <: xClass {
  Main := Child vs
}
`;

var fSubChildList =
      fClass
    + fIdentityIgnore
    + String.raw`
fSubChildList {
  Main [child vs] = ‛«child»«vs»’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛«lv»«ComponentName»«rv»,«more»’
  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`;

function fmtChildList (text) {
    let instantiations = '';
    let success = true;
    success && ([success, instantiations, errormessage] = transpile (text, "ChildList", gSubChildList, fSubChildList, ohm, compilefmt));
    if (success) {
	return instantiations;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}


/* 
form
{"receivers":[{"receiver":{"component":"cell_7","port":"b"}}],"senders":[{"sender":{"component":".","port":"a"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"d"}}],"senders":[{"sender":{"component":"cell_7","port":"c"}}]}
{"receivers":[{"receiver":{"component":".","port":"f"}}],"senders":[{"sender":{"component":"cell_8","port":"e"}}]}
*/

var gSubConnections = gClass + String.raw`
Connections <: xClass {
  Main := Connection*
  SelfReceiver = dq "receivers" dq ":" "[" "{" dq "receiver" dq ":" SelfPair "}" "]"
  SelfSender = dq "senders" dq ":" "[" "{" dq "sender" dq ":" SelfPair "}" "]"
  SelfPair = "{" dq "component" dq ":" dq "." dq "," dq "port" dq ":" PortName "}"

  Connection := 
    | "{" SelfReceiver "," SelfSender "}" -- passThrough
    | "{" Receiver "," SelfSender "}" -- down
    | "{" SelfReceiver "," Sender "}" -- up
    | "{" Receiver "," Sender "}" -- route
}
`;

var fSubConnections =
      fClass
    + fIdentityIgnore
+ `Names {
ComponentName_self [q1 s q2] = ‛«q1»«s»«q2»’
ComponentName_name [s] = ‛«s»’
PortName [s] = ‛«s»’
}`
    + String.raw`
fSubConnections {
  Main [Connection*] = ‛«Connection»’

  Connection [x] = ‛«x»’
  Connection_passThrough [lb Receiver kcomma Sender rb] = ‛\n«lv»PassThroughConnect («Sender», «Receiver»)«rv»,’
  Connection_down [lb Receiver kcomma Sender rb] = ‛\n«lv»DownConnect («Sender», «Receiver»)«rv»,’
  Connection_up [lb Receiver kcomma Sender rb] = ‛\n«lv»UpConnect («Sender», «Receiver»)«rv»,’
  Connection_route [lb Receiver kcomma Sender rb] = ‛\n«lv»RouteConnect («Sender», «Receiver»)«rv»,’

  SelfReceiver [dq1 kwreceivers dq1 kcolon1 lbracket lbrace dq3 kwreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛SelfReceiver («Pair»)’
  SelfSender  [dq1 kwsenders dq2 kcolon1 lbracket lbrace dq3 kwsender dq4 kcolon2 Pair rbrace rbracket] = ‛SelfSender («Pair»)’

  SelfPair [lb dq1 kwcomponent dq2 kcolon1 dq1 kdot dq2 kcomma dq3 kwport dq4 kcolon2 PortName rb] = ‛self,'«PortName»'’

  Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛Receiver («Pair»)’
  Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛Sender («Pair»)’
  Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛«ComponentName»,'«PortName»'’

  ConnectionBody [lb Connection* optcomma* rb] = ‛«Connection»’

ComponentJSON [x] = ‛\n«x»’
ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛\n«NonEmptyChildren»«ComponentField»’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n«ChildList»’
ChildList [lb Child rb] = ‛\n«Child»’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛\n«KindName»,«ComponentName»«more»’

CField_insert [dq1 k dq2 kcolon vs kcomma? rec?] = ‛\n«vs»«rec»’

  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`;

function fmtConnections (text) {
    let connections = '';
    let success = true;
    success && ([success, connections, errormessage] = transpile (text, "Connections", gSubConnections, fSubConnections, ohm, compilefmt));
    if (success) {
	return connections;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}




function emitPython (transformedCode) {
    let r = true;
    let output = '';

    const boilerPlateImports = `
${lv}
from message import Message
from sender import Sender
from selfsender import SelfSender
from receiver import Receiver
from selfreceiver import SelfReceiver
from upconnect import UpConnect
from downconnect import DownConnect
from routeconnect import RouteConnect
from passthroughconnect import PassThroughConnect
from container import Container
${rv}
`;
    let xclass = ''; // "xclass" to avoid any hint of name clash with "class" keyword...
    let childImports = '';
    r && ([r, childImports] = test (transformedCode, "ChildImports", gChildImports, fChildImports));
    dump (childImports);

    {
	// intermediate tests - xclass invokes these for real

	var childtest = String.raw`{"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}`;
	let childInstances = fmtChildInstances (childtest);
	dump (childInstances);

	let childList = fmtChildList (childtest);
	dump (childList);

	let connectionstest = String.raw`
{"receivers":[{"receiver":{"component":"cell_7","port":"stdin"}}],"senders":[{"sender":{"component":".","port":"stdin"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"stdin"}}],"senders":[{"sender":{"component":"cell_7","port":"stdout"}}]}
{"receivers":[{"receiver":{"component":".","port":"stdout"}}],"senders":[{"sender":{"component":"cell_8","port":"stdout"}}]}
`;
	let connections = fmtConnections (connectionstest);
	dump (connections);
    }
    r && ([r, xclass] = test (transformedCode, "xClass", gClass, fClass));
    dump (xclass);
    if (r) {
      	let finalCode = boilerPlateImports + childImports + xclass;
      	finalCode = removeVerbatimBrackets (finalCode);
      	finalCode = fixupCode (finalCode);
      	finalCode = indenter (finalCode);
	return finalCode;
    }
}

  const cl_gChildImports = gIdentityEmitter + String.raw`
ChildImports <: IdentityEmitter {
}
`;

const cl_fChildImports =
        fIdentityEmitter
      + fIdentityIgnore
+ `
fOverride {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛«vs1»«vs2»«Component»«vs3»«vs4»’
  Component [SelfDef SelfKind ComponentDef] = ‛\n«ComponentDef»’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n«vs1»«vs2»«ComponentJSON»«vs3»«vs4»’
  Child [lb kkind kcolon KindName kcomma kname kcolon ComponentName rb optcomma? more?] = ‛\n«lv»from «KindName» import «KindName»«rv»«more»’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛«ChildList»’
  ChildList [lb Child rb] = ‛«Child»’
  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`
;
  var cl_gClass = gIdentityEmitter + String.raw`
xClass <: IdentityEmitter {
}
`;

var cl_fClass =
    fIdentityEmitter
    + fIdentityIgnore
+ String.raw`
override {
  Components [vs1 lb vs2 Component+ vs3 rb vs4] = ‛«vs1»«vs2»«Component»«vs3»«vs4»«resetselfkind ()»’
  Component [SelfDef SelfKind ComponentDef] = ‛\n«ComponentDef»’
  ComponentDef [vs1 lb vs2 ComponentJSON vs3 rb vs4 optcomma] = ‛\n«vs1»«vs2»«ComponentJSON»«vs3»«vs4»’
  ComponentJSON [x] = ‛«x»’
  NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛«ChildList»’
  ChildList [lb Child rb] = ‛«Child»’

  ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛
(in-package "EH")

(defun new-«topselfkind ()» (parent name)
(let ((self (make-instance 'Container :parent parent :name name)))
«cl_fmtChildInstances (NonEmptyChildren, cl_fmtChildList (NonEmptyChildren, ComponentField))»))’

  ComponentLeafJSON  [lb EmptyChildren ComponentField rb] = ‛’

Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛«lb»«kkind»«kcolon1»«KindName»«kcomma»«kname»«kcolon2»«ComponentName»«rb»«optComma»«more»’

CField_connections [dq1 k dq2 kcolon ConnectionBody kcomma? rec?] = ‛«ConnectionBody»«rec»’
ConnectionBody [lb Connection* optcomma* rb] 
  = ‛«cl_fmtConnections (Connection, "\n(setf (children self) children)\n(setf (connections self) connections)\nself" )»’

Connection [lb Receiver kcomma Sender rb] = ‛«lb»«Receiver»«kcomma»«Sender»«rb»’

Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«kreceivers»«dq2»«kcolon1»«lbracket»«lbrace»«dq3»«kreceiver»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’

Sender [dq1 ksenders dq2 kcolon1 klbracket klbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛«dq1»«ksenders»«dq2»«kcolon1»«klbracket»«klbrace»«dq3»«ksender»«dq4»«kcolon2»«Pair»«rbrace»«rbracket»’

Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛«lb»«kwcomponent»«kcolon1»«ComponentName»«kcomma»«kwport»«kcolon2»«PortName»«rb»’

}
`;

/* Child formatter
   parses: {"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}
   used twice:
   1. parse child string and return
      cell_7 = Hello (...)
      cell_8 = World (...)

   2. parse child string and return
      self.children = [cell_7, cell_8]
*/


// 1.
// #include "childinstanceparser.js"

// 2.
// #include "childlistparser.js"


/* calls sub-parsers and sub-fmts to format child lists */
function cl_fmtChild (text) {

    throw 'connections first, then cihld list, then child instances'
    ;
    
	let retval = "(make-instance 'container :children children :connections connections)"
	let connections = cl_fmtConnections (connectionstest, retval);
	cl_dump (connections);

	let childList = cl_fmtChildList (childtest, connections);
	cl_dump (childList);
	gencode = childList;

	var innerText = childList;
	console.log (childList);

	let childInstances = cl_fmtChildInstances (childtest, innerText);
	cl_dump (childInstances);
	gencode = childInstances;
    return `${gencode}`
}

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




/* 
form
{"receivers":[{"receiver":{"component":"cell_7","port":"b"}}],"senders":[{"sender":{"component":".","port":"a"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"d"}}],"senders":[{"sender":{"component":"cell_7","port":"c"}}]}
{"receivers":[{"receiver":{"component":".","port":"f"}}],"senders":[{"sender":{"component":"cell_8","port":"e"}}]}
*/

var cl_gSubConnections = gClass + String.raw`
Connections <: xClass {
  Main := Connection*
  SelfReceiver = dq "receivers" dq ":" "[" "{" dq "receiver" dq ":" SelfPair "}" "]"
  SelfSender = dq "senders" dq ":" "[" "{" dq "sender" dq ":" SelfPair "}" "]"
  SelfPair = "{" dq "component" dq ":" dq "." dq "," dq "port" dq ":" PortName "}"

  Connection := 
    | "{" SelfReceiver "," SelfSender "}" -- passThrough
    | "{" Receiver "," SelfSender "}" -- down
    | "{" SelfReceiver "," Sender "}" -- up
    | "{" Receiver "," Sender "}" -- route
}
`;

var cl_fSubConnections =
      fClass
    + fIdentityIgnore
+ `Names {
ComponentName_self [q1 s q2] = ‛«q1»«s»«q2»’
ComponentName_name [s] = ‛«s»’
PortName [s] = ‛«s»’
}`
    + String.raw`
fSubConnections {
  Main [Connection*] = ‛«Connection»’

  Connection [x] = ‛«x»’
  Connection_passThrough [lb Receiver kcomma Sender rb] = ‛\n«lv»(make-instance 'PassThroughConnect :sender «Sender» :receiver «Receiver»)«rv» ’
  Connection_down [lb Receiver kcomma Sender rb] = ‛\n«lv»(make-instance 'DownConnect :sender «Sender» :receiver «Receiver»)«rv» ’
  Connection_up [lb Receiver kcomma Sender rb] = ‛\n«lv»(make-instance 'UpConnect :sender «Sender» :receiver «Receiver»)«rv» ’
  Connection_route [lb Receiver kcomma Sender rb] = ‛\n«lv»(make-instance 'RouteConnect :sender «Sender» :receiver «Receiver»)«rv» ’

  SelfReceiver [dq1 kwreceivers dq1 kcolon1 lbracket lbrace dq3 kwreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'SelfReceiver «Pair»)’
  SelfSender  [dq1 kwsenders dq2 kcolon1 lbracket lbrace dq3 kwsender dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'SelfSender «Pair»)’

  SelfPair [lb dq1 kwcomponent dq2 kcolon1 dq1 kdot dq2 kcomma dq3 kwport dq4 kcolon2 PortName rb] = ‛:component self :port "«PortName»"’

  Receiver [dq1 kreceivers dq2 kcolon1 lbracket lbrace dq3 kreceiver dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'Receiver «Pair»)’
  Sender  [dq1 ksenders dq2 kcolon1 lbracket lbrace dq3 ksender dq4 kcolon2 Pair rbrace rbracket] = ‛(make-instance 'Sender «Pair»)’
  Pair [lb kwcomponent kcolon1 ComponentName kcomma kwport kcolon2 PortName rb] = ‛:component «ComponentName» :port "«PortName»"’

  ConnectionBody [lb Connection* optcomma* rb] = ‛«Connection»’

ComponentJSON [x] = ‛\n«x»’
ComponentContainerJSON [lb NonEmptyChildren ComponentField rb] = ‛\n«NonEmptyChildren»«ComponentField»’
NonEmptyChildren [dq1 kchildren dq2 kcolon ChildList optcomma?] = ‛\n«ChildList»’
ChildList [lb Child rb] = ‛\n«Child»’
Child [lb kkind kcolon1 KindName kcomma kname kcolon2 ComponentName rb optComma? more?] = ‛\n«KindName»,«ComponentName»«more»’

  string [vs0 dq1 c* dq2 vs1] = ‛«vs0»«c»«vs1»’
}
`;

function cl_fmtConnections (text, innerCode) {
    let connections = '';
    let success = true;
    success && ([success, connections, errormessage] = transpile (text, "Connections", cl_gSubConnections, cl_fSubConnections, ohm, compilefmt));
    if (success) {
	return `${lv}(let ((-(connections (list (- ${connections} -))))\n${innerCode}-))${rv}`;
    } else {
	var msg = `<??? ${errormessage} ???>`;
	console.error (msg);
	return msg;
    }
}



function emitCommonLisp (transformedCode) {
    let r = true;
    let output = '';

    const boilerPlateImports = `
${lv}
${rv}
`;
    let xclass = ''; // "xclass" to avoid any hint of name clash with "class" keyword...

    {
	// intermediate tests - xclass invokes these for real

	var childtest = String.raw`{"kind":"Hello","name":"cell_7"},{"kind":"World","name":"cell_8"}`;

	let connectionstest = String.raw`
{"receivers":[{"receiver":{"component":"cell_7","port":"stdin"}}],"senders":[{"sender":{"component":".","port":"stdin"}}]}
{"receivers":[{"receiver":{"component":"cell_8","port":"stdin"}}],"senders":[{"sender":{"component":"cell_7","port":"stdout"}}]}
{"receivers":[{"receiver":{"component":".","port":"stdout"}}],"senders":[{"sender":{"component":"cell_8","port":"stdout"}}]}
`;
/*
	    let retval = "(make-instance 'container :children children :connections connections)"
	    let connections = cl_fmtConnections (connectionstest, retval);

	    let childList = cl_fmtChildList (childtest, connections);
	    cl_dump (childList);
	    gencode = childList;
	    var innerText = childList;
	    console.log (childList);

	let childInstances = cl_fmtChildInstances (childtest, innerText);
	    cl_dump (childInstances);
	    gencode = childInstances;

	gencode = cl_fmtChildInstances (childtest,
					cl_fmtChildList (childtest,
								    cl_fmtConnections (connectionstest, 
										       "(make-instance 'container :children children :connections connections)")));
	return gencode;
*/	
    }
    r && ([r, gencode] = test (transformedCode, "xClass", cl_gClass, cl_fClass));

    if (r) {
      	let finalCode = boilerPlateImports + gencode;
      	finalCode = removeVerbatimBrackets (finalCode);
      	finalCode = fixupCode (finalCode);
      	finalCode = indenter (finalCode);
	return finalCode;
    }
}

const jsonsrc = String.raw`
[
  [
    {
      "children": [ {"kind":"Hello", "name":"cell_7"},  {"kind":"World", "name":"cell_8"} ],
      "connections": [
	{
	  "receivers": [ {"receiver": {"component":"cell_7", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"cell_6", "port":"stdin"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_8", "port":"stdin"}} ],
	  "senders": [ {"sender": {"component":"cell_7", "port":"stdout"}} ]
	},
	{
	  "receivers": [ {"receiver": {"component":"cell_6", "port":"stdout"}} ],
	  "senders": [ {"sender": {"component":"cell_8", "port":"stdout"}} ]
	}
      ],
      "id":"cell_6",
      "inputs": ["cell_17" ],
      "kind":"HelloWorld",
      "name":"HelloWorld",
      "outputs": ["cell_15" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_7",
      "inputs": ["cell_12" ],
      "kind":"Hello",
      "name":"Hello",
      "outputs": ["cell_10" ],
      "synccode":""
    }
  ],
  [
    {
      "children": [],
      "connections": [],
      "id":"cell_8",
      "inputs": ["cell_11" ],
      "kind":"World",
      "name":"World",
      "outputs": ["cell_14" ],
      "synccode":""
    }
  ]
]
`;
// node version ("neh") tail code  
  function test (src, grammarName, grammar, fmt) {
      [success, transpiled, errormessage] = transpile (src, grammarName, grammar, fmt, ohm, compilefmt);
      if (success) {
	  return [true, transpiled];
      } else {
	  return [false, errormessage];
      }
  }

  function generate () {
      src = jsonsrc;

// Information Gatherer ("semantics" passes)

      let r = undefined;
      let output = '';
      [r, output] = test (src, "DaS", dasgrammar, dasfmt);
      r && ([r, output] = test (output, "SelfReplacer", gSelfreplacer, fSelfreplacer));
      
// Code Emitter

      var transformedCode = output;

/*
      var pyCode = emitPython (transformedCode);
      return pyCode;
*/

      var lispCode = emitCommonLisp (transformedCode);
      return lispCode;
      
  }

function dump (s) {
}

function cl_dump (s) {
}



var result = generate ();
console.log (result);

