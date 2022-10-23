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

      var pyCode = emitPython (transformedCode);
      return pyCode;

/*
      var lispCode = emitCommonLisp (transformedCode);
      document.getElementById('cloutput').value = lispCode;
*/
      
  }

function dump (s) {
}

function cl_dump (s) {
}



var result = generate ();
console.log (result);

