import {SimplePool} from 'nostr-tools'

import {fallbackRelays} from './nostr'

let pool = new SimplePool({getTimeout: 5600})

export async function getMetadata(pubkey: string, relays: string[]) {
  return pool.get(Array.from(new Set([...(relays || []), ...fallbackRelays])), {
    authors: [pubkey],
    kinds: [0]
  })
}

export async function getProfileMetadataEvents(pubkey: string, relays: string[]) {
  return pool.list(
    Array.from(new Set([...(relays || []), ...fallbackRelays])),
    [
      {
        authors: [pubkey],
        kinds: [/* 0 is already fetched at this point */ 2, 3],
        limit: 15
      }
    ]
  )
}