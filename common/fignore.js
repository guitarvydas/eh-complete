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
