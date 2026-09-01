// src/app/components/toolbar/AlignmentTools.tsx
import { Editor } from '@tiptap/react';
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from 'react-icons/fi';
import { MdFormatAlignJustify } from 'react-icons/md';

interface AlignmentToolsProps {
        editor: Editor;
}

export default function AlignmentTools({ editor }: AlignmentToolsProps) {
        return (
                <div className="flex items-center gap-1 app-rich-editor__tool-group rounded-2xl p-2 border shadow-sm">
                        <button
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive({ textAlign: 'left' })
                                                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="تراز به چپ"
                        >
                                <FiAlignLeft size={18} />
                        </button>
                        <button
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive({ textAlign: 'center' })
                                                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="تراز به وسط"
                        >
                                <FiAlignCenter size={18} />
                        </button>
                        <button
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive({ textAlign: 'right' })
                                                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="تراز به راست"
                        >
                                <FiAlignRight size={18} />
                        </button>
                        <button
                                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive({ textAlign: 'justify' })
                                                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="تراز به دو طرف"
                        >
                                <MdFormatAlignJustify size={18} />
                        </button>
                </div>
        );
}