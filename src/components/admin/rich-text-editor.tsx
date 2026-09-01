"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { createClient } from "@/lib/supabase/client";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  LinkIcon,
  Undo,
  Redo,
} from "lucide-react";

export function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[320px] px-4 py-3 focus:outline-none prose-headings:font-display prose-a:text-verified",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  async function handleImageUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;

      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (error) {
        alert(`Image upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      editor.chain().focus().setImage({ src: data.publicUrl }).run();
    };
    input.click();
  }

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    {
      icon: LinkIcon,
      action: () => {
        const url = window.prompt("Link URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
      active: editor.isActive("link"),
    },
    { icon: ImageIcon, action: handleImageUpload, active: false },
  ];

  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-line bg-paper-deep px-2 py-1.5">
        {buttons.map(({ icon: Icon, action, active }, i) => (
          <button
            key={i}
            type="button"
            onClick={action}
            className={
              "flex h-7 w-7 items-center justify-center rounded transition " +
              (active ? "bg-ink text-white" : "text-ink-soft hover:bg-white")
            }
          >
            <Icon size={14} />
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-line" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="flex h-7 w-7 items-center justify-center rounded text-ink-soft hover:bg-white"
        >
          <Undo size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="flex h-7 w-7 items-center justify-center rounded text-ink-soft hover:bg-white"
        >
          <Redo size={14} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
