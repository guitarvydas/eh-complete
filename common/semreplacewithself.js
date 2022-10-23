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
