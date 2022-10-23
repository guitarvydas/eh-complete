

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

