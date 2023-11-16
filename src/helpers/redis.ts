import "server-only";

import { kv } from "@vercel/kv";

export async function increment(key: string, namespace: string = "") {

  const data = await kv.hincrby(namespace, key, 1);

  if (data) {
    return data;
  } else {
    await set(key, "0", namespace);
    return 0;
  }
}

export async function get(key: string, namespace: string = "") {

  const data = await kv.hget(namespace, key);
 

  if (data) {
    return parseInt(String(data));
  } else {
    await set(key, "0", namespace);
    return 0;
  }

}

export function set(key: string, value: string, namespace: string = "") {
  return kv.hset(namespace, { [key]: value });
}