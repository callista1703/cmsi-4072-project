import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import { Bold, Italic } from "lucide-react";

const content = "<p>Hello World!</p>";
const extensions = [
	StarterKit.configure({
		heading: {
			levels: [1, 2, 3],
		},
	}),
	Link,
	CharacterCount,
];

// remember to deal with duplicate import for heading later

const TextEditor = () => {
	const editor = useEditor({
		extensions,
		content,
	});

	if (!editor) {
		return null;
	}

	return (
		<>
			<div className="flex p-1 gap-2 rounded-t bg-black">
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={`p-1 border rounded-md text-white cursor-pointer ${
						editor.isActive("bold") ? "bg-red-500" : ""
					}`}
				>
					<Bold size={14} />
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={`p-1 border rounded-md text-white cursor-pointer ${
						editor.isActive("italic") ? "bg-red-500" : ""
					}`}
				>
					<Italic size={14} />
				</button>
			</div>
			<EditorContent editor={editor} />
		</>
	);
};

export default TextEditor;
