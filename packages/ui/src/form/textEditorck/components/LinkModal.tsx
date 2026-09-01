// src/app/components/modals/LinkModal.tsx
import { Editor } from '@tiptap/react';
import { FiLink } from 'react-icons/fi';

interface LinkModalProps {
        isOpen: boolean;
        onClose: () => void;
        linkUrl: string;
        setLinkUrl: (url: string) => void;
        editor: Editor;
}

export default function LinkModal({
        isOpen,
        onClose,
        linkUrl,
        setLinkUrl,
        editor
}: LinkModalProps) {
        const addLink = () => {
                if (linkUrl && editor) {
                        editor.chain().focus().setLink({ href: linkUrl }).run();
                        setLinkUrl('');
                        onClose();
                }
        };

        if (!isOpen) return null;

        return (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                                        <FiLink className="text-blue-500" />
                                        افزودن لینک
                                </h3>
                                <input
                                        type="url"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full p-4 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <div className="flex gap-3">
                                        <button
                                                onClick={addLink}
                                                className="flex-1 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                                        >
                                                افزودن لینک
                                        </button>
                                        <button
                                                onClick={onClose}
                                                className="flex-1 py-3 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                                        >
                                                انصراف
                                        </button>
                                </div>
                        </div>
                </div>
        );
}