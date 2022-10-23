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
