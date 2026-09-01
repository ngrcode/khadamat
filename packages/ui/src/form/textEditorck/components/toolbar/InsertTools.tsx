// src/app/components/toolbar/InsertTools.tsx
import { Editor } from '@tiptap/react';
import { FiLink, FiImage, FiVideo, FiTable, FiCode } from 'react-icons/fi';
import { MdLineWeight } from 'react-icons/md';
import { BsFillChatQuoteFill } from 'react-icons/bs';

interface InsertToolsProps {
        editor: Editor;
        onLinkModalOpen: () => void;
        onImageModalOpen: () => void;
        onVideoModalOpen: () => void;
        onTableModalOpen: () => void;
}

export default function InsertTools({
        editor,
        onLinkModalOpen,
        onImageModalOpen,
        onVideoModalOpen,
        onTableModalOpen
}: InsertToolsProps) {
        const insertHorizontalRule = () => {
                editor?.chain().focus().setHorizontalRule().run();
        };

        const insertBlockquote = () => {
                editor?.chain().focus().toggleBlockquote().run();
        };

        const removeLink = () => {
                editor?.chain().focus().unsetLink().run();
        };

        return (
                <div className="flex items-center gap-1 app-rich-editor__tool-group rounded-2xl p-2 border shadow-sm">
                        <button
                                onClick={onLinkModalOpen}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('link')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="افزودن لینک"
                        >
                                <FiLink size={18} />
                        </button>
                        {editor.isActive('link') && (
                                <button
                                        onClick={removeLink}
                                        className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                                        title="حذف لینک"
                                >
                                        <FiLink size={18} className="rotate-45" />
                                </button>
                        )}
                        <button
                                onClick={onImageModalOpen}
                                className="p-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                title="افزودن تصویر"
                        >
                                <FiImage size={18} />
                        </button>
                        <button
                                onClick={onVideoModalOpen}
                                className="p-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                title="افزودن ویدیو"
                        >
                                <FiVideo size={18} />
                        </button>
                        <button
                                onClick={onTableModalOpen}
                                className="p-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                title="افزودن جدول"
                        >
                                <FiTable size={18} />
                        </button>
                        <button
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('codeBlock')
                                                ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="بلوک کد"
                        >
                                <FiCode size={18} />
                        </button>
                        <button
                                onClick={insertHorizontalRule}
                                className="p-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                title="خط افقی"
                        >
                                <MdLineWeight size={18} />
                        </button>
                        <button
                                onClick={insertBlockquote}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('blockquote')
                                                ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="نقل قول"
                        >
                                <BsFillChatQuoteFill size={18} />
                        </button>
                </div>
        );
}