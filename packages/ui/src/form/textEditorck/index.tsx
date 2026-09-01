// src/components/TiptapEditorComponent.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { extensions } from './components/extensions'; // مسیر صحیح را تنظیم کنید
import { useState, useRef, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import StatusBar from './components/StatusBar';
import LinkModal from './components/LinkModal';
import ImageModal from './components/ImageModal';
import VideoModal from './components/VideoModal';
import TableModal from './components/TableModal';
import { ClubLoading } from '../../loading/loading';

interface TiptapEditorProps {
        content: string;
        onChange: (content: string) => void;
        imageUrl: string;
        setImageUrl: (url: string) => void;
        wrapperClassName?: string; // اضافه شده برای کنترل ارتفاع از بیرون
}

export default function TiptapEditorComponent({
        content,
        onChange,
        imageUrl,
        setImageUrl,
        wrapperClassName, // دریافت کلاس اضافی
}: TiptapEditorProps) {
        const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
        const [isImageModalOpen, setIsImageModalOpen] = useState(false);
        const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
        const [isTableModalOpen, setIsTableModalOpen] = useState(false);
        const [showTableControls, setShowTableControls] = useState(false);
        const [linkUrl, setLinkUrl] = useState('');
        const [imageUrlInput, setImageUrlInput] = useState('');
        const [videoUrl, setVideoUrl] = useState('');
        const [wordCount, setWordCount] = useState(0);
        const [charCount, setCharCount] = useState(0);
        const [isFullscreen, setIsFullscreen] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const editor = useEditor({
                extensions,
                content,
                editorProps: {
                        attributes: {
                                class: 'ProseMirror app-rich-editor__content prose prose-lg max-w-none focus:outline-none min-h-[600px] p-8',
                                style: 'font-family: IranSans; font-size: 16px; line-height: 1.8;',
                        },
                },
                onUpdate: ({ editor }) => {
                        onChange(editor.getHTML());
                        updateCounts(editor.getText());
                },
                immediatelyRender: false,
        });

        const updateCounts = (text: string) => {
                const words = text.split(/\s+/).filter(word => word.length > 0).length;
                const chars = text.length;
                setWordCount(words);
                setCharCount(chars);
        };

        useEffect(() => {
                if (editor) {
                        updateCounts(editor.getText());
                        const checkTableActive = () => {
                                setShowTableControls(editor.isActive('table'));
                        };
                        editor.on('selectionUpdate', checkTableActive);
                        editor.on('transaction', checkTableActive);
                        return () => {
                                editor.off('selectionUpdate', checkTableActive);
                                editor.off('transaction', checkTableActive);
                        };
                }
        }, [editor]);

        if (!editor) {
                return (
                        <div className="app-rich-editor app-rich-editor--loading flex items-center justify-center min-h-[400px] rounded-2xl border">
                                <div className="text-center">
                                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                                        <p className="app-rich-editor__muted text-lg">در حال راه‌اندازی ویرایشگر...</p>
                                        <ClubLoading isLoading={true} />
                                </div>
                        </div>
                );
        }

        return (
                <div
                        className={`
        app-rich-editor rounded-2xl shadow-lg border overflow-hidden 
        transition-all duration-300 
        ${isFullscreen ? 'fixed inset-4 z-50 rounded-none' : ''}
        ${wrapperClassName || ''}
      `}
                >
                        <Toolbar
                                editor={editor}
                                onLinkModalOpen={() => setIsLinkModalOpen(true)}
                                onImageModalOpen={() => setIsImageModalOpen(true)}
                                onVideoModalOpen={() => setIsVideoModalOpen(true)}
                                onTableModalOpen={() => setIsTableModalOpen(true)}
                                showTableControls={showTableControls}
                                fileInputRef={fileInputRef}
                        />

                        <div className="relative">
                                <div className="app-rich-editor__canvas p-8 min-h-[600px]">
                                        <EditorContent editor={editor} />
                                </div>
                        </div>

                        <LinkModal
                                isOpen={isLinkModalOpen}
                                onClose={() => setIsLinkModalOpen(false)}
                                linkUrl={linkUrl}
                                setLinkUrl={setLinkUrl}
                                editor={editor}
                        />

                        <ImageModal
                                isOpen={isImageModalOpen}
                                onClose={() => setIsImageModalOpen(false)}
                                imageUrlInput={imageUrlInput}
                                setImageUrlInput={setImageUrlInput}
                                editor={editor}
                                fileInputRef={fileInputRef}
                        />

                        <VideoModal
                                isOpen={isVideoModalOpen}
                                onClose={() => setIsVideoModalOpen(false)}
                                videoUrl={videoUrl}
                                setVideoUrl={setVideoUrl}
                                editor={editor}
                        />

                        <TableModal
                                isOpen={isTableModalOpen}
                                onClose={() => setIsTableModalOpen(false)}
                                editor={editor}
                        />

                        <StatusBar
                                editor={editor}
                                wordCount={wordCount}
                                charCount={charCount}
                                onUndo={() => editor.chain().focus().undo().run()}
                                onRedo={() => editor.chain().focus().redo().run()}
                        />
                </div>
        );
}