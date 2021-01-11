#!/bin/bash

while true; do
    deno run -A download.js
    sh gitpush.sh
    # every 3hour
    sleep 10800
done

