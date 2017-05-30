#!/usr/bin/python

import os
import sys
import json
import base64
from Crypto.Hash import SHA256

def main():
    str = "{\"typ\":\"JWT\",\n \"alg\":\"HS256\"}".encode('utf-8')
    print("string: ", str)
    b64 = base64.urlsafe_b64encode(str)
    print("b64: ", b64)
    h = SHA256.new(b64)
    print(h.hexdigest())


main()
