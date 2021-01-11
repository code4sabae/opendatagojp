import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { sleep } from "https://code4sabae.github.io/js/sleep.js";
import { SJIS } from "https://code4sabae.github.io/js/SJIS.js";
import { fetchCurl } from "https://code4sabae.github.io/js/fetchCurl.js";

const url = "https://portal.opendata.go.jp/files/apis.csv";

const scsv = await (await fetch(url)).text();
const list = CSV.toJSON(CSV.decode(scsv));

for (const dset of list) {
  console.log(dset);
  //const bin = new Uint8Array(await (await fetch(dset.data_source)).arrayBuffer());
  const bin = await fetchCurl(dset.data_source);
  console.log(bin.length);
  const sjis = SJIS.isSJIS(bin);
  const s =  sjis ? SJIS.decode(bin) : new TextDecoder().decode(bin);
  // const s = SJIS.decodeAuto(bin);
  await Deno.mkdir("csv/" + dset.product, { recursive: true });
  const path = dset.product + dset.path + ".csv";
  await Deno.writeTextFile("csv/" + path, s);
  dset.charset = sjis ? "SJIS" : "UTF-8";
  dset.cached = "https://code4sabae.github.io/opendatagojp/csv/" + path;
  await sleep(500);
}
await Deno.writeTextFile("csv/index.csv", CSV.encode(CSV.fromJSON(list)));
