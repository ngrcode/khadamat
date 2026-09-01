// src/app/extensions.ts
import { StarterKit } from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TextAlign } from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { CodeBlock } from '@tiptap/extension-code-block';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Highlight } from '@tiptap/extension-highlight'; // <-- اضافه شد

export const extensions = [
        StarterKit.configure({
                heading: {
                        levels: [1, 2, 3, 4, 5, 6],
                },
                codeBlock: false,
                bold: {
                        HTMLAttributes: {
                                class: 'font-bold',
                        },
                },
                italic: {
                        HTMLAttributes: {
                                class: 'italic',
                        },
                },
                strike: {
                        HTMLAttributes: {
                                class: 'line-through',
                        },
                },
        }),

        Table.configure({
                resizable: true,
                allowTableNodeSelection: true,
                HTMLAttributes: {
                        class: 'min-w-full border-collapse border border-gray-300 rounded-xl shadow-sm my-6 bg-white overflow-hidden',
                },
        }),
        TableRow.configure({
                HTMLAttributes: {
                        class: 'hover:bg-gray-50 transition-colors',
                },
        }),
        TableHeader.configure({
                HTMLAttributes: {
                        class: 'bg-gradient-to-r from-gray-50 to-gray-100 font-bold text-gray-900 border-b-2 border-gray-300',
                },
        }),
        TableCell.configure({
                HTMLAttributes: {
                        class: 'border border-gray-300 p-4 min-w-[120px]',
                },
        }),

        TextAlign.configure({
                types: ['heading', 'paragraph', 'image', 'tableCell'],
                alignments: ['left', 'center', 'right', 'justify'],
        }),

        Placeholder.configure({
                placeholder: 'شروع به نوشتن کنید... (برای دستورات از منوی بالا استفاده کنید)',
        }),

        Underline.configure({
                HTMLAttributes: {
                        class: 'underline',
                },
        }),

        Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                        class: 'text-blue-600 underline decoration-2 hover:text-blue-800 transition-colors duration-200',
                },
        }),

        CodeBlock.configure({
                HTMLAttributes: {
                        class: 'bg-gray-900 text-gray-100 p-6 rounded-2xl font-mono text-sm border-l-4 border-blue-500 shadow-lg',
                },
        }),

        HorizontalRule.configure({
                HTMLAttributes: {
                        class: 'my-10 border-t-2 border-gray-300',
                },
        }),

        Dropcursor.configure({
                width: 2,
                color: '#3B82F6',
        }),

        Blockquote.configure({
                HTMLAttributes: {
                        class: 'border-l-4 border-blue-500 pl-4 my-4 italic bg-blue-50 py-2 pr-4 rounded-r-xl',
                },
        }),

        // اضافه کردن هایلایت با تنظیمات دلخواه
        Highlight.configure({
                HTMLAttributes: {
                        class: 'bg-yellow-200 text-gray-900 px-1 rounded', // استایل پیش‌فرض
                },
        }),
];