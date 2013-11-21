
# usage: for ITEM in `find . -type f -name *.cache`;do echo $ITEM; cat $ITEM | python ~/scripts/parsejson.py data.type; done
import sys,json

myJson = json.load(sys.stdin)
if len(sys.argv) > 1:
  currentItem = myJson
  for subItem in sys.argv[1].split('.'):
    currentItem=currentItem[subItem]
  print currentItem
else:
  print json.dumps(myJson, sort_keys=True, indent=4, separators=(',', ': '))
