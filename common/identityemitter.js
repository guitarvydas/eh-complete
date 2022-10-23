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

