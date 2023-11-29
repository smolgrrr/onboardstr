import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MdOutlineCopyAll, MdCheckBox } from 'react-icons/md';

const Result = ({ secret, client }: { secret: string, client: string | undefined}) => {
    let [isOpen, setIsOpen] = useState(true)
    let [isCopied, setIsCopied] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    const copyToClipboard = (text: string) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setIsCopied(true)
      };

    return (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      🔒 Secret Key
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        KEEP THIS KEY SOMEWHERE SAFE
                      </p>
                    </div>
                    <div className="mt-2 flex" onClick={() => copyToClipboard(secret)} >
                    {isCopied ? <MdCheckBox size={36}/> : <MdOutlineCopyAll size={36}/>} <span className="overflow-scroll my-auto px-2">{secret}</span>
                    </div>
                    <p className="pt-4 text-sm text-gray-500">
                        You can use this key to log into any NOSTR client
                    </p>
                    {client &&
                    <div className="pt-2 flex flex-col">
                        <span>Recommended Client</span>
                        <a href={atob(client)} className='underline'>{atob(client)}</a>
                    </div>
                    }
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    );
};

export default Result;