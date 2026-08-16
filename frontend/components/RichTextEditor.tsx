"use client";

import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link2,
} from "lucide-react";
import { useEffect, useRef } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const TEXT_COLORS = [
  { label: "Black", value: "#0f172a" },
  { label: "Red", value: "#dc2626" },
  { label: "Blue", value: "#2563eb" },
  { label: "Green", value: "#16a34a" },
  { label: "Purple", value: "#9333ea" },
  { label: "Orange", value: "#ea580c" },
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // set initial content once (or when value changes from OUTSIDE, e.g. edit page prefill)
  useEffect(() => {
    if (editorRef.current && isFirstRender.current) {
      editorRef.current.innerHTML = value || "";
      isFirstRender.current = false;
    }
  }, [value]);

  const runCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      runCommand("createLink", url);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: "bold", label: "Bold" },
    { icon: Italic, command: "italic", label: "Italic" },
    { icon: Heading2, command: "formatBlock:h2", label: "Heading" },
    { icon: Heading3, command: "formatBlock:h3", label: "Subheading" },
    { icon: List, command: "insertUnorderedList", label: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", label: "Numbered List" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-300">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        {toolbarButtons.map((button) => (
          <button
            key={button.label}
            type="button"
            title={button.label}
            onMouseDown={(event) => {
              event.preventDefault();
              if (button.command.startsWith("formatBlock:")) {
                runCommand("formatBlock", button.command.split(":")[1]);
              } else {
                runCommand(button.command);
              }
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200"
          >
            <button.icon size={17} />
          </button>
        ))}

        <button
          type="button"
          title="Insert Link"
          onMouseDown={(event) => {
            event.preventDefault();
            handleLink();
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200"
        >
          <Link2 size={17} />
        </button>

        {/* TEXT COLOR SWATCHES */}
        <div className="ml-1 flex items-center gap-1 border-l border-slate-200 pl-2">
          {TEXT_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              title={color.label}
              onMouseDown={(event) => {
                event.preventDefault();
                runCommand("foreColor", color.value);
              }}
              className="h-6 w-6 rounded-full border border-white shadow ring-1 ring-slate-200 transition hover:scale-110"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>

      {/* EDITABLE AREA */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        suppressContentEditableWarning
        className="prose prose-sm min-h-[280px] max-w-none px-5 py-4 leading-relaxed outline-none [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-indigo-600 [&_a]:underline empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
