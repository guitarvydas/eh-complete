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

