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


