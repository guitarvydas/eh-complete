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


