// src/app/components/toolbar/ColorTools.tsx
import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { MdFormatColorText, MdOutlineFormatColorReset, MdOutlineHighlight } from 'react-icons/md';

interface ColorToolsProps {
        editor: Editor;
}

export default function ColorTools({ editor }: ColorToolsProps) {
        const [textColor, setTextColor] = useState('#000000');

        const clearFormatting = () => {
                editor?.chain().focus().clearNodes().unsetAllMarks().run();
        };

        return (
                <div className="flex items-center gap-2 app-rich-editor__tool-group rounded-2xl p-2 border shadow-sm">
                        <div className="relative group">
                                <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => {
                                                setTextColor(e.target.value);
                                                editor.chain().focus().setColor(e.target.value).run();
                                        }}
                                        className="w-8 h-8 cursor-pointer rounded-lg border-0 opacity-0 absolute inset-0"
                                        title="رنگ متن"
                                />
                                <div className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
                                        <MdFormatColorText size={18} className="text-gray-600" />
                                </div>
                        </div>
                        <button
                                onClick={clearFormatting}
                                className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                                title="پاک کردن فرمت"
                        >
                                <MdOutlineFormatColorReset size={18} />
                        </button>
                        <button
                                onClick={() => editor.chain().focus().toggleHighlight().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('highlight')
                                                ? 'bg-yellow-500 text-gray-900 shadow-lg transform scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="هایلایت"
                        >
                                <MdOutlineHighlight size={18} />
                        </button>
                </div>
        );
}