// src/app/components/StatusBar.tsx
import { Editor } from '@tiptap/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface StatusBarProps {
        editor: Editor;
        wordCount: number;
        charCount: number;
        onUndo: () => void;
        onRedo: () => void;
}

export default function StatusBar({
        editor,
        wordCount,
        charCount,
        onUndo,
        onRedo
}: StatusBarProps) {
        return (
                <div className="app-rich-editor__statusbar border-t p-4">
                        <div className="app-rich-editor__muted flex items-center justify-between text-sm">
                                <div className="flex items-center gap-6">
                                        <button
                                                onClick={onUndo}
                                                className="app-rich-editor__tool-btn flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent"
                                        >
                                                <FiArrowLeft size={16} />
                                                بازگردانی
                                        </button>
                                        <button
                                                onClick={onRedo}
                                                className="app-rich-editor__tool-btn flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent"
                                        >
                                                <FiArrowRight size={16} />
                                                انجام مجدد
                                        </button>
                                </div>

                                <div className="flex items-center gap-4">
                                        <div className="app-rich-editor__tool-group flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span>ذخیره شده</span>
                                        </div>
                                        {editor.isActive('table') && (
                                                <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200">
                                                        📊 جدول فعال
                                                </span>
                                        )}
                                        {editor.isActive('link') && (
                                                <span className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200">
                                                        🔗 لینک فعال
                                                </span>
                                        )}
                                        <div>
                                                {wordCount} کلمه • {charCount} کاراکتر
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
