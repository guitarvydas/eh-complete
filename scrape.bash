grep '<script src=' eh.html \
    | grep -v 'http' \
    | sed -e 's/\>\<\/script\>//g' \
    | sed -e 's/^[ 	]*\<script src=//g' \
    | tr -d '"' \
    | sed -e 's/$/ \\/' \
    | sed -e '$s/\\//' \
	  >/tmp/files.txt

echo 'cat \\' >/tmp/nv.bash
cat /tmp/files.txt >>/tmp/nv.bash
source /tmp/nv.bash >eh-body.js


	   
