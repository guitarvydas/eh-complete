
temp=temp${RANDOM}
# component


cat >${temp}.pl <<'~~~'
:- use_module(library(http/json)).
?- consult("fb.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2j/component_helper.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2j/code.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2j/connection.pl").
query_helper(Component):-
das_fact(kind,RID,rectangle),
das_fact(name,RID,Name),
das_fact(kindtype,RID,KindType),
( hasport(RID) ; (\+ hasport(RID), hasnoparent(RID), Inputs = [], Outputs = []) ),
( (hasport(RID), inputs(RID,Inputs), outputs(RID,Outputs)) ; fail ),
children(RID,Children),
codeof(RID,Code),
connectionsof(RID,Connections),
Component = component{id:RID, name:Name, kind:KindType, inputs:Inputs, outputs:Outputs, children:Children, connections:Connections, synccode:Code},
true.
query:-
(setof([Component],query_helper(Component),Set),
json_write(user_output,Set,[width(128)])
)
;
json_write(user_output,[],[width(123)]).
~~~
cat >${temp}.js <<'~~~'
const fs = require ('fs');
var rawText = fs.readFileSync ('/dev/fd/0');
var parameters = JSON.parse(rawText);
parameters.forEach (p => {
  var Component = p [0];
  ;
});
  
if (true) { console.log (`${rawText}`);}
~~~
swipl -g "consult(${temp})." -g 'query.' -g 'halt.' | node ${temp}.js
rm -f ${temp}.pl
rm -f ${temp}.js

