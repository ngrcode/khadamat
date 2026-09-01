// src/app/components/toolbar/HeadingSelector.tsx
import { Editor } from '@tiptap/react';

interface HeadingSelectorProps {
        editor: Editor;
}

export default function HeadingSelector({ editor }: HeadingSelectorProps) {
        return (
                <div className="flex items-center gap-1 app-rich-editor__tool-group rounded-2xl p-2 border shadow-sm">
                        <select
                                onChange={(e) => {
                                        if (e.target.value === 'paragraph') {
                                                editor.chain().focus().setParagraph().run();
                                        } else {
                                                editor.chain().focus().toggleHeading({ level: parseInt(e.target.value) }).run();
                                        }
                                }}
                                className="p-2 rounded-xl border-0 bg-transparent focus:outline-none text-sm"
                                title="سایز و استایل متن"
                        >
                                <option value="paragraph">متن معمولی</option>
                                <option value="1">عنوان ۱</option>
                                <option value="2">عنوان ۲</option>
                                <option value="3">عنوان ۳</option>
                                <option value="4">عنوان ۴</option>
                        </select>
                </div>
        );
}