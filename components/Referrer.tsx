import { useState, useEffect } from 'react';
import { Event } from 'nostr-tools'
import { getMetadata } from '@/utils/tools';

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

const Referrer = ({ pubkey }: { pubkey: string }) => {
    const [metadata, setMetadata] = useState<Event>();

    useEffect(() => {
        const fetchMetadata = async () => {
            console.log(pubkey)
            const data = await getMetadata(pubkey, []);
            if (data) {
                setMetadata(data);
            }
        };

        fetchMetadata();
    }, [pubkey]);
    const metadataParsed = metadata ? parseMetadata(metadata) : null;

    return (
        <div className='mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]'>
            <span className='text-xl font-medium'>Referrer: </span>
            <div className="pb-8 flex items-center mx-auto">
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