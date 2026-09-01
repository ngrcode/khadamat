import { Editor } from '@tiptap/react';
import { RefObject } from 'react';
import TextFormattingTools from './TextFormattingTools';
import AlignmentTools from './toolbar/AlignmentTools';
import HeadingSelector from './toolbar/ HeadingSelector';
import ListTools from './toolbar/ListTools';
import InsertTools from './toolbar/InsertTools';
import ColorTools from './toolbar/ColorTools';
import TableControls from './toolbar/TableControls';

interface ToolbarProps {
        editor: Editor;
        onLinkModalOpen: () => void;
        onImageModalOpen: () => void;
        onVideoModalOpen: () => void;
        onTableModalOpen: () => void;
        showTableControls: boolean;
        fileInputRef: RefObject<HTMLInputElement>;
}

export default function Toolbar({
        editor,
        onLinkModalOpen,
        onImageModalOpen,
        onVideoModalOpen,
        onTableModalOpen,
        showTableControls,
        fileInputRef
}: ToolbarProps) {
        return (
                <div className="app-rich-editor__toolbar border-b sticky top-0 z-40">
                        <div className="p-4">
                                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                                        <div className="flex items-center gap-3 flex-wrap">
                                                <TextFormattingTools editor={editor} />
                                                <AlignmentTools editor={editor} />
                                                <HeadingSelector editor={editor} />
                                                <ListTools editor={editor} />
                                                <InsertTools
                                                        editor={editor}
                                                        onLinkModalOpen={onLinkModalOpen}
                                                        onImageModalOpen={onImageModalOpen}
                                                        onVideoModalOpen={onVideoModalOpen}
                                                        onTableModalOpen={onTableModalOpen}
                                                />
                                                <ColorTools editor={editor} />
                                        </div>
                                </div>

                                {showTableControls && editor.isActive('table') && (
                                        <TableControls editor={editor} />
                                )}
                        </div>
                </div>
        );
}