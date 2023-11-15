import { useState, useEffect } from 'react';
import { Event, nip19 } from 'nostr-tools'
import { attachFile, renderMedia} from '@/utils/FileUpload';
import { getProfileMetadataEvents, publishUser } from '@/utils/tools';
import { UnsignedEvent } from 'nostr-tools';
import JSConfetti from 'js-confetti'

const parseProfileMetadata = (events: Event[]) => {
    let followingPubKeySet = new Set<string>();
    let relaysMap = new Map();

    events.forEach(event => {
        const followingPubKey = event.tags.filter(tag => tag[0] === 'p').map(tag => tag[1]);
        const relays = event.content ? JSON.parse(event.content) : {};

        followingPubKey.forEach(key => followingPubKeySet.add(key));
        for (let url in relays) {
            relaysMap.set(url, relays[url]);
        }
    });

    return { followingPubKey: Array.from(followingPubKeySet), relays: Array.from(relaysMap.entries()) };
}

let jsConfetti: JSConfetti;

const Form = ({ pubkey }: { pubkey: string }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [profileNetadata, setProfileMetadata] = useState<Event[]>([]);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [sk, setSK] = useState('')

    useEffect(() => {
        import('js-confetti').then((module) => {
            jsConfetti = new module.default();
          });

        const fetchProfileMetadata = async () => {
            const data = await getProfileMetadataEvents(pubkey, []);
            if (data.length > 0) {
                setProfileMetadata(data);
            }
        };

        fetchProfileMetadata();
    }, [pubkey]);
    const { followingPubKey, relays } = parseProfileMetadata(profileNetadata)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        jsConfetti.addConfetti()

        const relay_urls = relays.map(([url, _]) => url);
        let relayObject = Object.fromEntries(relays);

        let unsignedProfileMetadata: UnsignedEvent = {
            pubkey: '',
            kind: 3,
            tags: [],
            content: JSON.stringify(relayObject),
            created_at: Math.floor(Date.now() / 1000),
        }
        followingPubKey.forEach(pubkey => unsignedProfileMetadata.tags.push(['p', pubkey]));

        let metadataContent: any = {};

        if (name) {
            metadataContent.name = name;
            metadataContent.display_name = name;
        }

        if (file) {
            metadataContent.picture = file;
        }

        let unsignedMetadata: UnsignedEvent = {
            pubkey: '',
            kind: 0,
            tags: [],
            content: JSON.stringify(metadataContent),
            created_at: Math.floor(Date.now() / 1000),
        }

        let sk;
        if (name || file) {
            sk = await publishUser(unsignedProfileMetadata, relay_urls, unsignedMetadata);
        } else {
            sk = await publishUser(unsignedProfileMetadata, relay_urls);
        }
        setSK(nip19.nsecEncode(sk as string));
    };

    return (
        <div>
            <div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]">
                {sk && <span className="hover:cursor-pointer" onClick={() => navigator.clipboard.writeText(sk)}>Here&apos;s your secret key: {sk}</span>}
                <h1 className="text-xl font-medium">Create NOSTR Account</h1>
                <form className="grid gap-6" name="post" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input name="sub" type="text" onChange={(e) => setName(e.target.value)} className="my-0 mb-2 block w-full rounded-md border border-zinc-300 py-2 px-3 text-sm hover:border-zinc-400 bg-zinc-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="block mb-2 text-sm font-medium">Upload Profile Pic</label>
                        <input type="file" name="file_input" id="file_input"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            onChange={async (e) => {
                                const file_input = e.target.files?.[0];
                                if (file_input) {
                                    // Check if file size is greater than 2.5MB
                                    if (file_input.size > 2.5 * 1024 * 1024) {
                                        return;
                                    }
                                    setUploadingFile(true);
                                    const attachedFile = await attachFile(file_input);
                                    setFile(attachedFile);
                                    setUploadingFile(false);
                                }
                            }}
                        />
                        {renderMedia(file)}
                        {uploadingFile ? (
                            <div className="flex animate-pulse text-sm">
                                <span>Uploading...</span>
                            </div>
                        ) : null}
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-zinc-400 disabled:pointer-events-none dark:focus:ring-offset-zinc-900 data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800 text-white hover:bg-zinc-700 dark:text-zinc-900 h-10 py-2 px-4 bg-blue-400 dark:bg-blue-400 dark:hover:bg-blue-500 dark:hover:text-black">Generate key</button>
                </form>
            </div>
        </div>
    );
};

export default Form;