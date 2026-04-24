"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Code,
    Code2,
    Heading1,
    Heading2,
    Heading3,
    Pilcrow,
    ChevronDown,
    Minus,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    /** Called once on mount with an imperative insert function so the parent can push snippets into the editor */
    onInsertSnippetReady?: (fn: (snippet: string) => void) => void;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder,
    className,
    onInsertSnippetReady,
}: RichTextEditorProps) {
    const isInternalUpdate = useRef(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // heading levels 1-3
                heading: { levels: [1, 2, 3] },
                // disable hard break in favour of markdown newlines
                hardBreak: false,
            }),
            Underline,
            Placeholder.configure({
                placeholder: placeholder || "Write your system prompt here…",
                emptyEditorClass:
                    "before:content-[attr(data-placeholder)] before:pointer-events-none before:absolute before:text-muted-foreground before:text-xs",
            }),
            Markdown.configure({
                html: false,
                tightLists: true,
                transformPastedText: true,
                transformCopiedText: true,
            }),
        ],
        immediatelyRender: false,
        content: value || "",
        onUpdate({ editor }) {
            const md = (editor.storage as unknown as { markdown: MarkdownStorage }).markdown.getMarkdown();
            isInternalUpdate.current = true;
            onChange(md);
        },
        editorProps: {
            attributes: {
                // Base classes; prose styles come from globals.css .ProseMirror rules
                class: "",
            },
        },
    });

    // Expose imperative insert function to parent (for snippet palette)
    useEffect(() => {
        if (!editor || !onInsertSnippetReady) return;
        onInsertSnippetReady((snippet: string) => {
            editor
                .chain()
                .focus()
                .insertContent(snippet)
                .run();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    // Sync external value changes (e.g. Regenerate button) into the editor
    useEffect(() => {
        if (!editor) return;
        if (isInternalUpdate.current) {
            isInternalUpdate.current = false;
            return;
        }
        const current = (editor.storage as unknown as { markdown: MarkdownStorage }).markdown.getMarkdown();
        if (current !== value) {
            editor.commands.setContent(value || "");
        }
    }, [editor, value]);

    if (!editor) return null;

    const headingLabel = editor.isActive("heading", { level: 1 })
        ? "Heading 1"
        : editor.isActive("heading", { level: 2 })
        ? "Heading 2"
        : editor.isActive("heading", { level: 3 })
        ? "Heading 3"
        : "Paragraph";

    return (
        <div
            className={cn(
                "rounded-[var(--radius-input)] border border-input bg-muted/20 transition-[color,box-shadow] focus-within:border-primary/30 focus-within:ring-[3px] focus-within:ring-primary/12",
                className
            )}
        >
            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-input px-2 py-1.5">
                {/* Text style dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={toolbarBtn()}>
                            <Pilcrow className="size-3.5" />
                            <span className="text-xs hidden sm:inline">{headingLabel}</span>
                            <ChevronDown className="size-3" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[140px]">
                        <DropdownMenuItem
                            onSelect={() => editor.chain().focus().setParagraph().run()}
                            className={cn("text-xs gap-2", editor.isActive("paragraph") && "bg-accent")}
                        >
                            <Pilcrow className="size-3.5" /> Paragraph
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={cn("text-xs gap-2", editor.isActive("heading", { level: 1 }) && "bg-accent")}
                        >
                            <Heading1 className="size-3.5" /> Heading 1
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={cn("text-xs gap-2", editor.isActive("heading", { level: 2 }) && "bg-accent")}
                        >
                            <Heading2 className="size-3.5" /> Heading 2
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={cn("text-xs gap-2", editor.isActive("heading", { level: 3 }) && "bg-accent")}
                        >
                            <Heading3 className="size-3.5" /> Heading 3
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Divider />

                {/* Bold */}
                <ToolbarButton
                    active={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold (⌘B)"
                >
                    <Bold className="size-3.5" />
                </ToolbarButton>

                {/* Italic */}
                <ToolbarButton
                    active={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic (⌘I)"
                >
                    <Italic className="size-3.5" />
                </ToolbarButton>

                {/* Underline */}
                <ToolbarButton
                    active={editor.isActive("underline")}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline (⌘U)"
                >
                    <UnderlineIcon className="size-3.5" />
                </ToolbarButton>

                <Divider />

                {/* Bullet list */}
                <ToolbarButton
                    active={editor.isActive("bulletList")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet list"
                >
                    <List className="size-3.5" />
                </ToolbarButton>

                {/* Ordered list */}
                <ToolbarButton
                    active={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered list"
                >
                    <ListOrdered className="size-3.5" />
                </ToolbarButton>

                <Divider />

                {/* Inline code */}
                <ToolbarButton
                    active={editor.isActive("code")}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    title="Inline code"
                >
                    <Code className="size-3.5" />
                </ToolbarButton>

                {/* Code block */}
                <ToolbarButton
                    active={editor.isActive("codeBlock")}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    title="Code block"
                >
                    <Code2 className="size-3.5" />
                </ToolbarButton>

                {/* Horizontal rule */}
                <ToolbarButton
                    active={false}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal rule"
                >
                    <Minus className="size-3.5" />
                </ToolbarButton>
            </div>

            {/* ── Editor content ── */}
            <div className="max-h-[560px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toolbarBtn(extra?: string) {
    return cn(
        "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        extra
    );
}

function ToolbarButton({
    active,
    onClick,
    title,
    children,
}: {
    active: boolean;
    onClick: () => void;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={cn(
                "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                active && "bg-accent text-foreground"
            )}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="mx-1 h-4 w-px bg-border" />;
}
