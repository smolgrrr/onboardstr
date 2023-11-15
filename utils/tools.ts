import { SimplePool, UnsignedEvent, finishEvent, generatePrivateKey, getPublicKey, Relay, relayInit, Sub, Filter, Event } from 'nostr-tools'

import { fallbackRelays } from './nostr'


let pool = new SimplePool({ getTimeout: 5600 })

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
        kinds: [3],
        limit: 15
      }
    ]
  )
}

type SubCallback = (
  event: Readonly<Event>,
  relay: Readonly<string>,
) => void;

type Subscribe = {
  cb: SubCallback;
  filter: Filter;
  unsub?: boolean;
};


export async function publishUser(profileMetadata: UnsignedEvent, relays: string[], metadata?: UnsignedEvent) {
  let sk = generatePrivateKey();
  let pk = getPublicKey(sk);

  let signedMetadata: Event
  if (metadata) {
    signedMetadata = finishEvent(metadata, sk);
  }
  let signedProfileMetadata = finishEvent(profileMetadata, sk);

  relays.forEach(url => {
    const relay = relayInit(url);
    relay.on('connect', () => {
      console.info(`connected to ${relay.url}`);
    });
    relay.on('error', () => {
      console.warn(`failed to connect to ${relay.url}`);
    });
    try {
      relay.connect().then(() => {
        if (metadata) {
          relay.publish(signedMetadata);
          console.info(`${relay.url} has accepted our metadata event: ${signedMetadata.id}`);
        }
        relay.publish(signedProfileMetadata);
      }).catch((error) => {
        console.warn(`could not connect to ${url}: ${error}`);
      });
    } catch {
      console.warn(`could not connect to ${url}`);
    }
  });

  return sk
}