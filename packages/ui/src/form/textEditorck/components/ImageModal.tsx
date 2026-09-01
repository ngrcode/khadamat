// src/app/components/modals/ImageModal.tsx
import { Editor } from '@tiptap/react';
import { RefObject } from 'react';
import { FiImage } from 'react-icons/fi';

interface ImageModalProps {
        isOpen: boolean;
        onClose: () => void;
        imageUrlInput: string;
        setImageUrlInput: (url: string) => void;
        editor: Editor;
        fileInputRef: RefObject<HTMLInputElement>;
}

export default function ImageModal({
        isOpen,
        onClose,
        imageUrlInput,
        setImageUrlInput,
        editor,
        fileInputRef
}: ImageModalProps) {
        const addImage = () => {
                const url = imageUrlInput || window.prompt('آدرس تصویر را وارد کنید:');
                if (url && editor) {
                        editor.chain().focus().setImage({ src: url }).run();
                        setImageUrlInput('');
                        onClose();
                }
        };

        const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        if (editor) {
                                editor.chain().focus().setImage({ src: objectUrl }).run();
                                onClose();
                        }
                }
        };

        if (!isOpen) return null;

        return (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                                        <FiImage className="text-orange-500" />
                                        افزودن تصویر
                                </h3>
                                <input
                                        type="url"
                                        value={imageUrlInput}
                                        onChange={(e) => setImageUrlInput(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full p-4 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <div className="flex gap-3 mb-4">
                                        <button
                                                onClick={addImage}
                                                className="flex-1 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                                        >
                                                افزودن تصویر
                                        </button>
                                        <button
                                                onClick={onClose}
                                                className="flex-1 py-3 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                                        >
                                                انصراف
                                        </button>
                                </div>
                                <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-4 border-2 border-dashed border-gray-400 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-600 font-semibold hover:border-green-500 hover:text-green-600"
                                >
                                        📁 آپلود از کامپیوتر
                                </button>
                                <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                />
                        </div>
                </div>
        );
}