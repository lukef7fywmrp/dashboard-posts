"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline as UnderlineIcon,
} from "lucide-react";

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  className?: string;
}

export default function TiptapEditor({
  content = "",
  onChange,
  editable = true,
  className = "",
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextStyle,
      Color,
      Underline,
      Typography,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`${editable ? "border rounded-lg" : ""} ${className} w-full`}
    >
      {editable && (
        <div className="border-b p-2 flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleBold().run();
            }}
            data-active={editor.isActive("bold")}
            className={`${editor.isActive("bold") ? "bg-muted" : ""}`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleItalic().run();
            }}
            data-active={editor.isActive("italic")}
            className={`${editor.isActive("italic") ? "bg-muted" : ""}`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleUnderline().run();
            }}
            data-active={editor.isActive("underline")}
            className={`${editor.isActive("underline") ? "bg-muted" : ""}`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleBulletList().run();
            }}
            data-active={editor.isActive("bulletList")}
            className={`${editor.isActive("bulletList") ? "bg-muted" : ""}`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleOrderedList().run();
            }}
            data-active={editor.isActive("orderedList")}
            className={`${editor.isActive("orderedList") ? "bg-muted" : ""}`}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleBlockquote().run();
            }}
            data-active={editor.isActive("blockquote")}
            className={`${editor.isActive("blockquote") ? "bg-muted" : ""}`}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            data-active={editor.isActive("heading", { level: 1 })}
            className={`${
              editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""
            }`}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            data-active={editor.isActive("heading", { level: 2 })}
            className={`${
              editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""
            }`}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            data-active={editor.isActive("heading", { level: 3 })}
            className={`${
              editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""
            }`}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const url = window.prompt("Enter the URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            data-active={editor.isActive("link")}
            className={`${editor.isActive("link") ? "bg-muted" : ""}`}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const url = window.prompt("Enter the image URL");
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-neutral max-w-none w-full [&_.ProseMirror]:w-full [&_.ProseMirror:focus]:rounded-b-md",
          editable
            ? "[&_.ProseMirror]:p-4 [&_.ProseMirror]:min-h-[200px]"
            : "[&_.ProseMirror]:-my-[1.25em]"
        )}
      />
    </div>
  );
}
