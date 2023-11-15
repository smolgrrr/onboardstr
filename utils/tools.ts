import {SimplePool,  UnsignedEvent, finishEvent, generatePrivateKey, getPublicKey} from 'nostr-tools'

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
        kinds: [3],
        limit: 15
      }
    ]
  )
}


export async function publishUser(profileMetadata: UnsignedEvent, relays: string[], metadata?: UnsignedEvent) {
  const completeRelay = Array.from(new Set([...(relays || []), ...fallbackRelays]));
  let sk = generatePrivateKey();
  let pk = getPublicKey(sk);

    try {    
      if (metadata) {
        metadata.pubkey = pk;
        let signedMetadata = finishEvent(metadata, sk);
        console.log(signedMetadata)
        let pub1 = pool.publish(completeRelay, signedMetadata);
        console.log(pub1)
      }
    } catch (error) {
      console.error('Error in publishUser while handling metadata:', error);
    }
    
    try {
      profileMetadata.pubkey = pk;
      let signedProfileMetadata = finishEvent(profileMetadata, sk);
      console.log(signedProfileMetadata)
      let pub2 = pool.publish(completeRelay, signedProfileMetadata);
      console.log(pub2)
    
      return pk 
    } catch (error) {
      console.error('Error in publishUser while handling profile metadata:', error);
    }
}