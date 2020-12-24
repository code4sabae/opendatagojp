import { createApp } from "https://servestjs.org/@v1.1.7/mod.ts";

const apikey = (await Deno.readTextFile("apikey.txt")).trim();

const app = createApp();

app.get(/\/*/, async (req) => {
  const q = req.url.lastIndexOf("?");
  console.log(req.path);
  const url = "https://api.opendata.go.jp/" + req.url + (q < 0 ? "?" : "&") + "apikey=" + apikey;
  console.log(url);
  const body = await (await fetch(url)).text();
  const headers = new Headers({
    "Content-Type" : "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  await req.respond({ status: 200, headers, body });
});

app.listen({ port: 3002 });
