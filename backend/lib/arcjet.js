import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

//initalize arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //shield protects your app from common attacks ex: SQL injection, xxs, csrf attack
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      //block all bots expect search engines
      allow: ["CATEGPRY: SEARCH_ENGINE"],
    }),
    //rate limiting

    tokenBucket({
      mode: "LIVE",
      refillRate: 7,
      interval: 11,
      capacity: 11,
    }),
  ],
});
