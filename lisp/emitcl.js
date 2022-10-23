
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

