all: subgits src.js runpy runcl

subgits:
	multigit -r

src.js: helloworld.json
	echo 'const jsonsrc = String.raw`' > src.js
	cat helloworld.json >> src.js
	echo '`;' >> src.js

# copy/paste output code from eh.html into py/generated.py
run:
	(cd py ; make run)

eh-body.js: eh.html fmt-js/fmt-js.js fmt-js/transpile.js src.js
	./scrape.bash

neh.js: eh-body.js neh-head.js neh-tail.js
	cat neh-head.js eh-body.js neh-tail.js >neh.js

nehl.js: eh-body.js neh-head.js nehl-tail.js
	cat neh-head.js eh-body.js nehl-tail.js >nehl.js

py/generated.py: neh.js
	node neh.js >py/generated.py

runpy: py/generated.py
	(cd py ; python3 test.py)

LISPFILES =\
lisp/connector.lisp \
lisp/container.lisp \
lisp/downconnect.lisp \
lisp/eh.lisp \
lisp/fifo.lisp \
lisp/generated.lisp \
lisp/hello.lisp \
lisp/hsm.lisp \
lisp/inputmessage.lisp \
lisp/load.lisp \
lisp/message.lisp \
lisp/outputmessage.lisp \
lisp/package.lisp \
lisp/passthroughconnect.lisp \
lisp/porthandler.lisp \
lisp/procedure.lisp \
lisp/receiver.lisp \
lisp/receiverqueue.lisp \
lisp/routeconnect.lisp \
lisp/runnable.lisp \
lisp/selfreceiver.lisp \
lisp/selfsender.lisp \
lisp/sender.lisp \
lisp/senderqueue.lisp \
lisp/state.lisp \
lisp/test.lisp \
lisp/upconnect.lisp \
lisp/world.lisp

lisp/generated.lisp: nehl.js
	node nehl.js >lisp/generated.lisp

runcl: lisp/generated.lisp $(LISPFILES)
	(cd lisp ; ./sbclrun.bash)

TOOLS = das
NODEMODULES=\
	node_modules/ohm-js \
	node_modules/yargs \
	node_modules/atob \
	node_modules/pako

tools:
	(cd das/dr ; make)
	(cd das/prep ; make)
	(cd das/d2f ; make)
	(cd das/das2f ; make)
	(cd das/das2j ; make)

helloworld.json : npmstuff tools helloworld.drawio
	das/generate.bash $(TOOLS) helloworld.drawio
	mv out.json helloworld.json

clean:
	(cd das ; make clean)
	rm -f junk* */junk*
	rm -f helloworld.json
	rm -rf _* */_*
	rm -f *~ */*~
	rm -f nehl.js neh.js
	rm -f lisp/generated.lisp py/generated.py
	rm -f fb.pl
	rm -f eh-body.js

npmstuff:
	npm install ohm-js yargs atob pako

