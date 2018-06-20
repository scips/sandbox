#!/usr/bin/python
# usage: for ITEM in `find . -type f -name *.cache`;do echo $ITEM; cat $ITEM | python ~/scripts/parsejson.py data.type; done
#GET logstash-log-api*/_search
{
  "query": {
    "query_string": {
      "query": "'Unexpected+disconnection'"
    }
  },
  "aggs" : {
    "group_by_error" : {
        "filter" : {
          "term": {
            "context.request.body": "errorDetails"
          } 
        }
    }
  } 
}

import sys,json
from datetime import datetime
from elasticsearch import Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

doc = {
    'author': 'scips & tro',
    'text': 'extract the cookie value of an json inside a json',
    'timestamp': datetime.now(),
}

res = es.search(index='logstash-log-api*', body={ "size": 1000, "query": {"query_string": { "query": "'Unexpected+disconnection' cookiesBefore" } } })

print("Got %d Hits:" % res['hits']['total'])
for hit in res['hits']['hits']:
    myJson = json.loads(hit["_source"]["context"]["request"]["body"])
    for page in myJson["data"]["history"]:
        if "events" in page:
            for event in page["events"]:
                if "error-autologin-gigya" in event:
                    print(event["error-autologin-gigya"]["context"]["response"]["time"])
                    print(page["gigyaCookie"])
        # print json.dumps(history, indent=4, separators=(',', ': '))
    # print(myJson)
    # print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])


