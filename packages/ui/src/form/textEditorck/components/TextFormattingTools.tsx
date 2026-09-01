// src/components/TextFormattingTools.tsx
import { Editor } from '@tiptap/react';
import { FiBold, FiUnderline } from 'react-icons/fi';
import { MdOutlineStrikethroughS, MdSuperscript, MdSubscript } from 'react-icons/md';
import React, { useState, useEffect } from 'react'; // 👈 Import React hooks

interface TextFormattingToolsProps {
        editor: Editor;
}

// ابزار کمکی برای استخراج مقدار عددی فونت از یک رشته (مثلاً "16px" -> 16)
const extractFontSize = (sizeString: string | null): number => {
        if (!sizeString) return 16; // مقدار پیش‌فرض
        const match = sizeString.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 16;
};

export default function TextFormattingTools({ editor }: TextFormattingToolsProps) {

        // 1. استیت برای مدیریت مقدار اسلایدر
        // مقدار اولیه از ویرایشگر گرفته می‌شود.
        const initialSize = extractFontSize(editor.getAttributes('textStyle').fontSize);
        const [fontSizeValue, setFontSizeValue] = useState(initialSize);

        // 2. همگام‌سازی اسلایدر با وضعیت ویرایشگر (مهم)
        useEffect(() => {
                if (!editor) return;

                const updateSlider = () => {
                        const currentEditorSize = extractFontSize(editor.getAttributes('textStyle').fontSize);
                        // فقط اگر مقدار استیت با مقدار فعلی ویرایشگر متفاوت بود، به‌روزرسانی کن
                        if (currentEditorSize !== fontSizeValue) {
                                setFontSizeValue(currentEditorSize);
                        }
                };

                // متدهای Tiptap برای گوش دادن به تغییرات
                editor.on('transaction', updateSlider);
                editor.on('selectionUpdate', updateSlider);

                // cleanup
                return () => {
                        editor.off('transaction', updateSlider);
                        editor.off('selectionUpdate', updateSlider);
                };
        }, [editor]); // وابستگی به editor

        // 3. تابع مدیریت تغییرات اسلایدر
        const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const newSize = parseInt(event.target.value, 10);
                setFontSizeValue(newSize);

                // اعمال تغییر بلافاصله به Tiptap
                // if (newSize === 16) {
                //         // 16px را می‌توان به عنوان پیش‌فرض در نظر گرفت و آن را حذف کرد.
                //         editor.chain().focus().unsetFontSize().run();
                // } else {
                //         editor.chain().focus().setFontSize(`${newSize}px`).run();
                // }
        };


        return (
                <div className="flex items-center gap-1 app-rich-editor__tool-group rounded-2xl p-2 border shadow-sm">

                        {/* Font Size Slider */}
                        <div className="flex items-center gap-2 px-2">
                                {/* Label یا نمایش مقدار فعلی */}
                                <span className="text-sm font-medium text-gray-700 w-10 text-center">{fontSizeValue}px</span>

                                <input
                                        type="range"
                                        min="8"        // حداقل اندازه فونت
                                        max="48"       // حداکثر اندازه فونت
                                        step="2"       // قدم تغییر اندازه (مثلاً 8, 10, 12, ...)
                                        value={fontSizeValue}
                                        onChange={handleSliderChange}
                                        className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg 
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                       [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 
                       [&::-webkit-slider-thumb]:rounded-full"
                                        title={`Font Size: ${fontSizeValue}px`}
                                        // disabled={!editor.can().setFontSize('16px')}
                                />
                        </div>

                        {/* Bold */}
                        <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('bold')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="Bold (Ctrl+B)"
                        >
                                <FiBold size={18} />
                        </button>

                        {/* Italic */}
                        <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('italic')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="Italic (Ctrl+I)"
                        >
                                <span className="italic font-semibold">I</span>
                        </button>

                        {/* Underline */}
                        <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('underline')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="Underline (Ctrl+U)"
                        >
                                <FiUnderline size={18} />
                        </button>

                        {/* Strike */}
                        <button
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('strike')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="Strike"
                        >
                                <MdOutlineStrikethroughS size={18} />
                        </button>

                        {/* Superscript */}
                        <button
                                onClick={() => editor.chain().focus()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('superscript')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="Superscript"
                        >
                                <MdSuperscript size={18} />
                        </button>

                        {/* Subscript */}
                        <button
                                onClick={() => editor.chain().focus()}
                                className={`p-2 rounded-xl transition-all duration-200 ${editor.isActive('subscript')
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                                : 'hover:bg-gray-100 hover:scale-105'
                                        }`}
                                title="Subscript"
                        >
                                <MdSubscript size={18} />
                        </button>

                </div>
        );
}