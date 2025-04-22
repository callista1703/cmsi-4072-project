import { Editor } from "@tiptap/react";
import {
	Bold as BoldIcon,
	Italic as ItalicIcon,
	Underline as UnderlineIcon,
	List as ListIcon,
	ListOrdered as ListOrderedIcon,
	Link2 as LinkIcon,
	Image as ImageIcon,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Heading1,
	Heading2,
	Heading3,
	Unlink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorProps {
	editor: Editor | null;
}

export const EditorBar = ({ editor }: EditorProps) => {
	if (!editor) return null;

	const addImage = () => {
		const url = prompt("Enter image URL");
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const addLink = () => {
		const url = prompt("Enter link URL");
		if (url) {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		}
	};

	const removeLink = () => {
		editor.chain().focus().unsetLink().run();
	};

	return (
		<div className="flex flex-wrap items-center gap-2 border-b pb-2 mb-2">
			<Button
				variant={editor.isActive("bold") ? "default" : "outline"}
				onClick={() => editor.chain().focus().toggleBold().run()}
				title="Bold"
				className="cursor-pointer"
			>
				<BoldIcon className="h-4 w-4" />
			</Button>
			<Button
				variant={editor.isActive("italic") ? "default" : "outline"}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				title="Italic"
				className="cursor-pointer"
			>
				<ItalicIcon className="h-4 w-4" />
			</Button>
			<Button
				variant={editor.isActive("underline") ? "default" : "outline"}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				title="Underline"
				className="cursor-pointer"
			>
				<UnderlineIcon className="h-4 w-4" />
			</Button>
			<Button
				variant={
					editor.isActive("heading", { level: 1 }) ? "default" : "outline"
				}
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				title="Heading 1"
				className="cursor-pointer"
			>
				<Heading1 className="h-4 w-4" />
			</Button>
			<Button
				variant={
					editor.isActive("heading", { level: 2 }) ? "default" : "outline"
				}
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				title="Heading 2"
				className="cursor-pointer"
			>
				<Heading2 className="h-4 w-4" />
			</Button>
			<Button
				variant={
					editor.isActive("heading", { level: 3 }) ? "default" : "outline"
				}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				title="Heading 3"
				className="cursor-pointer"
			>
				<Heading3 className="h-4 w-4" />
			</Button>
			<Button
				variant={editor.isActive("bulletList") ? "default" : "outline"}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				title="Bullet List"
				className="cursor-pointer"
			>
				<ListIcon className="h-4 w-4" />
			</Button>
			<Button
				variant={editor.isActive("orderedList") ? "default" : "outline"}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				title="Ordered List"
				className="cursor-pointer"
			>
				<ListOrderedIcon className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
				title="Align Left"
				className="cursor-pointer"
			>
				<AlignLeft className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
				title="Align Center"
				className="cursor-pointer"
			>
				<AlignCenter className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
				title="Align Right"
				className="cursor-pointer"
			>
				<AlignRight className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={addLink}
				title="Add Link"
				className="cursor-pointer"
			>
				<LinkIcon className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={removeLink}
				title="Remove Link"
				className="cursor-pointer"
			>
				<Unlink className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				onClick={addImage}
				title="Insert Image"
				className="cursor-pointer"
			>
				<ImageIcon className="h-4 w-4" />
			</Button>
		</div>
	);
};
