import { useRouter } from 'next/router'
import Form from '@/components/Form'
import Referrer from '@/components/Referrer'
import { nip19 } from 'nostr-tools'

export default function Post() {
  const router = useRouter()
  const { id } = router.query;
  const idString: string = id ? id.toString() : '';

  let pubkey: string;
  try {
      pubkey = nip19.decode(idString).data as string;
  } catch (error) {
      if (id) { // check if code is running on client side
          router.push('/invalid-npub');
      }
      return null;
  }

  return (
    <div className="grid grid-cols-1 gap-1 items-center justify-center pt-12 mx-4">
        <Referrer pubkey={pubkey} />
        <Form pubkey={pubkey} />
    </ div>
  );
}