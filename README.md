# opendatagojp
Open Data API Portal をシンプルなCSVファイルとして再配布
https://portal.opendata.go.jp/

## data
https://code4sabae.github.io/opendatagojp/csv/index.csv  
項目cachedに、UTF-8化したCSVファイルを3時間置きに取得し、GitHubにて再配布しています

## src
download.js を Deno で動かし取得  
autoupdate.sh を動かすことで全ファイルを自動取得  

## blog
政府提供Open Data APIを使ってみた感想と課題  
https://fukuno.jig.jp/3074  
