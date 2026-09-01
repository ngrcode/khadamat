// src/app/components/modals/VideoModal.tsx
import { Editor } from '@tiptap/react';
import { FiYoutube } from 'react-icons/fi';

interface VideoModalProps {
        isOpen: boolean;
        onClose: () => void;
        videoUrl: string;
        setVideoUrl: (url: string) => void;
        editor: Editor;
}

export default function VideoModal({
        isOpen,
        onClose,
        videoUrl,
        setVideoUrl,
        editor
}: VideoModalProps) {
        const addVideo = () => {
                if (videoUrl && editor) {
                        editor.commands.setYoutubeVideo({
                                src: videoUrl,
                                width: 640,
                                height: 360,
                        });
                        setVideoUrl('');
                        onClose();
                }
        };

        if (!isOpen) return null;

        return (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                                        <FiYoutube className="text-red-500" />
                                        افزودن ویدیو
                                </h3>
                                <input
                                        type="url"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        placeholder="https://youtube.com/embed/..."
                                        className="w-full p-4 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <div className="flex gap-3">
                                        <button
                                                onClick={addVideo}
                                                className="flex-1 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                                        >
                                                افزودن ویدیو
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