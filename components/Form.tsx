import { useState, useEffect } from 'react';
import { nip19 } from 'nostr-tools';
import { attachFile } from '@/utils/FileUpload';

const Form = () => {
    const [comment, setComment] = useState("");
    const [hasSubmittedPost, setHasSubmittedPost] = useState(false);

    return (
        <div>
            <div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]">
                <h1 className="text-xl font-medium">Create NOSTR Account</h1>
                <form className="grid gap-6" name="post" method="post" encType="multipart/form-data" 
                onSubmit={(e) => {
                    e.preventDefault();
                    setHasSubmittedPost(!hasSubmittedPost);
                }}>
                    <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input name="sub" type="text" onChange={(e) => setComment(e.target.value)} className="my-0 mb-2 block w-full rounded-md border border-zinc-300 py-2 px-3 text-sm hover:border-zinc-400 bg-zinc-300" />
                    </div>
                    <div className="space-y-2">
                        <label className="block mb-2 text-sm font-medium">Upload Profile Pic</label>
                        <input type="file" name="file_input" id="file_input"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            onChange={(e) => {
                                const file_input = e.target.files?.[0];
                                if (file_input) {
                                    attachFile(file_input);
                                }
                            }}
                            required
                        />
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-zinc-400 disabled:pointer-events-none dark:focus:ring-offset-zinc-900 data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800 text-white hover:bg-zinc-700 dark:text-zinc-900 h-10 py-2 px-4 bg-blue-400 dark:bg-blue-400 dark:hover:bg-blue-500 dark:hover:text-black">Generate key</button>
                </form>
            </div>
        </div>
    );
};

export default Form;