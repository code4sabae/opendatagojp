import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const list = CSV.toJSON(CSV.decode(await Deno.readTextFile("opendata-list.csv")));
const list2 = [];
for (const d of list) {
  const base = "https://code4sabae.github.io/opendatagojp/";
  const url = base + d.provider + "/" + d.path;
  const csv = url + ".csv";
  const json = url + ".json";
  list2.push({ csv, json });
}
await Deno.writeTextFile("opendata.csv", CSV.encode(CSV.fromJSON(list2)));
