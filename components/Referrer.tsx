import { useState, useEffect } from 'react';
import { nip19, Event } from 'nostr-tools'
import { getMetadata } from '@/utils/get-event';

interface Metadata {
    name?: string
    username?: string
    display_name?: string
    picture?: string
    banner?: string
    about?: string
    website?: string
    lud06?: string
    lud16?: string
    nip05?: string
}

const parseMetadata = (event: Event) => {
    const metadata: Metadata = JSON.parse(event.content)
    return metadata
}

const Referrer = ({ id }: { id: string }) => {
    const [metadata, setMetadata] = useState<Event>();
    const pubkey = nip19.decode(id)

    useEffect(() => {
        const fetchMetadata = async () => {
            const data = await getMetadata(pubkey.data as string, []);
            if (data) {
                setMetadata(data);
            }
        };

        fetchMetadata();
    }, [id]);
    const metadataParsed = metadata ? parseMetadata(metadata) : null;

    return (
        <div>
            <div className="pb-8 flex items-center">
                {metadataParsed &&
                    <>
                        <img
                            className={`h-32 w-32 overflow-hidden rounded-full`}
                            src={metadataParsed?.picture}
                            alt=""
                            loading="lazy"
                            decoding="async" />
                        <span className="text-3xl font-bold px-4">{metadataParsed.name}</span>
                    </>
                }
            </div>
            
        </div>
    );
};

export default Referrer;