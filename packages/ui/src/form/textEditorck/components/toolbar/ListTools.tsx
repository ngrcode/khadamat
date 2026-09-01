// src/app/components/toolbar/ListTools.tsx
import { Editor } from '@tiptap/react';
import { FiList, FiCheckSquare } from 'react-icons/fi';
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';

interface ListToolsProps {
        editor: Editor;
}

export default function ListTools({ editor }: ListToolsProps) {
        const increaseIndent = () => {
                editor.chain().focus().sinkListItem('listItem').run();
        };

        const decreaseIndent = () => {
                editor.chain().focus().liftListItem('listItem').run();
        };

        return (
                <div className="flex items-center gap-1 app-rich-editor__tool-group rounded-2xl p-2 border shadow-sm">
                        <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('bulletList')
                                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="لیست نشانه‌دار"
                        >
                                <FiList size={18} />
                        </button>
                        <button
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('orderedList')
                                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="لیست عددی"
                        >
                                1.
                        </button>
                        <button
                                onClick={() => editor.chain().focus().toggleTaskList().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('taskList')
                                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="لیست کارها"
                        >
                                <FiCheckSquare size={18} />
                        </button>
                        <button
                                onClick={increaseIndent}
                                disabled={!editor.can().sinkListItem('listItem')}
                                className={`p-2 rounded-xl transition-all duration-200 ${!editor.can().sinkListItem('listItem')
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="افزایش تورفتگی (فقط برای لیست‌ها)"
                        >
                                <MdFormatIndentIncrease size={18} />
                        </button>
                        <button
                                onClick={decreaseIndent}
                                disabled={!editor.can().liftListItem('listItem')}
                                className={`p-2 rounded-xl transition-all duration-200 ${!editor.can().liftListItem('listItem')
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="کاهش تورفتگی (فقط برای لیست‌ها)"
                        >
                                <MdFormatIndentDecrease size={18} />
                        </button>
                </div>
        );
}