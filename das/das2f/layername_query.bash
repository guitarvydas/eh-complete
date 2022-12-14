
temp=temp${RANDOM}
# layer names


cat >${temp}.pl <<'~~~'
:- use_module(library(http/json)).
?- consult("fb.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2f/shapes.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2f/onSameDiagram.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2f/inside.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2f/names.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2f/ports.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/eh/das/das2f/contains.pl").
query_helper(ID,Name):-
diagram_fact(vertex,ID,_),
diagram_fact(value,ID,Name),
true.
query:-
(setof([ID,Name],query_helper(ID,Name),Set),
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
  var ID = p [0];
var Name = p [1];
  
if (true) { console.log (`das_fact(name, ${ID}, \"${Name}\").
    das_fact(kindtype, ${ID}, \"${Name}\").`);};
});
  
~~~
swipl -g "consult(${temp})." -g 'query.' -g 'halt.' | node ${temp}.js
rm -f ${temp}.pl
rm -f ${temp}.js

