// src/app/components/toolbar/TableControls.tsx
import { Editor } from '@tiptap/react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
// import { BiMerge, BiSolidDuplicate } from 'react-icons/bi';

interface TableControlsProps {
        editor: Editor;
}

export default function TableControls({ editor }: TableControlsProps) {
        const addRowBefore = () => {
                editor?.chain().focus().addRowBefore().run();
        };

        const addRowAfter = () => {
                editor?.chain().focus().addRowAfter().run();
        };

        const deleteRow = () => {
                editor?.chain().focus().deleteRow().run();
        };

        const addColumnBefore = () => {
                editor?.chain().focus().addColumnBefore().run();
        };

        const addColumnAfter = () => {
                editor?.chain().focus().addColumnAfter().run();
        };

        const deleteColumn = () => {
                editor?.chain().focus().deleteColumn().run();
        };

        const deleteTable = () => {
                editor?.chain().focus().deleteTable().run();
        };

        const mergeCells = () => {
                try {
                        editor?.chain().focus().mergeCells().run();
                } catch (error) {
                        console.log('امکان ادغام این سلول‌ها وجود ندارد');
                }
        };

        const splitCell = () => {
                try {
                        editor?.chain().focus().splitCell().run();
                } catch (error) {
                        console.log('امکان تقسیم این سلول وجود ندارد');
                }
        };

        return (
                <div className="flex items-center gap-3 flex-wrap border-t border-gray-200 pt-4">
                        <span className="text-sm font-medium text-gray-700 bg-blue-50 px-3 py-1 rounded-full">
                                کنترل‌های جدول
                        </span>

                        <div className="flex items-center gap-2">
                                <button
                                        onClick={addRowBefore}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiPlus size={14} /> سطر بالا
                                </button>
                                <button
                                        onClick={addRowAfter}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiPlus size={14} /> سطر پایین
                                </button>
                                <button
                                        onClick={deleteRow}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiTrash2 size={14} /> حذف سطر
                                </button>
                        </div>

                        <div className="flex items-center gap-2">
                                <button
                                        onClick={addColumnBefore}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiPlus size={14} /> ستون چپ
                                </button>
                                <button
                                        onClick={addColumnAfter}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiPlus size={14} /> ستون راست
                                </button>
                                <button
                                        onClick={deleteColumn}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiTrash2 size={14} /> حذف ستون
                                </button>
                        </div>

                        <div className="flex items-center gap-2">
                             
                                <button
                                        onClick={deleteTable}
                                        className="px-3 py-1.5 text-sm bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                >
                                        <FiTrash2 size={14} /> حذف جدول
                                </button>
                        </div>
                </div>
        );
}