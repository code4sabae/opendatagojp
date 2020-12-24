import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { sleep } from "https://code4sabae.github.io/js/sleep.js"

const apikey = (await Deno.readTextFile("apikey.txt")).trim();

const fetchByAPI = async (provider, path) => {
  console.log(provider, path);
  const url = "https://api.opendata.go.jp/" + provider + "/" + path + "?apikey=" + apikey;
  console.log(url);
  const body = await (await fetch(url)).json();
  return body;
};

const list = CSV.toJSON(CSV.decode(await Deno.readTextFile("opendata-list.csv")));
for (const dset of list) {
  const json = await fetchByAPI(dset.provider, dset.path);
  await Deno.mkdir("data/" + dset.provider, { recursive: true });
  const fn = "data/" + dset.provider + "/" + dset.path;
  await Deno.writeTextFile(fn + ".json", JSON.stringify(json));
  try {
    await Deno.writeTextFile(fn + ".csv", CSV.encode(CSV.fromJSON(json)));
  } catch (e) {
    console.log(e);
  }
  await sleep(5000);
}
