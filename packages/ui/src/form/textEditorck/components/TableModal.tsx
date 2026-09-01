// src/app/components/modals/TableModal.tsx
import { Editor } from '@tiptap/react';
import { FiTable } from 'react-icons/fi';

interface TableModalProps {
        isOpen: boolean;
        onClose: () => void;
        editor: Editor;
}

export default function TableModal({
        isOpen,
        onClose,
        editor
}: TableModalProps) {
        const addTable = (rows: number, cols: number) => {
                if (editor) {
                        editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
                        onClose();
                }
        };

        if (!isOpen) return null;

        return (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 text-center flex items-center justify-center gap-2">
                                        <FiTable className="text-purple-500" />
                                        ایجاد جدول جدید
                                </h3>
                                <div className="grid grid-cols-5 gap-3 mb-6">
                                        {[3, 4, 5, 6, 7].map(rows =>
                                                [3, 4, 5, 6, 7].map(cols => (
                                                        <button
                                                                key={`${rows}-${cols}`}
                                                                onClick={() => addTable(rows, cols)}
                                                                className="w-12 h-12 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center text-sm font-semibold text-gray-700 hover:text-purple-600 hover:shadow-md"
                                                        >
                                                                {rows}×{cols}
                                                        </button>
                                                ))
                                        )}
                                </div>
                                <button
                                        onClick={onClose}
                                        className="w-full py-3 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                                >
                                        انصراف
                                </button>
                        </div>
                </div>
        );
}