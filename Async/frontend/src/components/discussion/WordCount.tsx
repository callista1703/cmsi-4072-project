import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";

interface WordCountProps {
	editor: Editor | null;
}

export const WordCount = ({ editor }: WordCountProps) => {
	const [wordCount, setWordCount] = useState(0);
	useEffect(() => {
		if (!editor) return;

		const updateWordCount = () => {
			const text = editor.getText();
			const count = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
			setWordCount(count);
		};

		editor.on("update", updateWordCount);
		updateWordCount();
		return () => {
			editor.off("update", updateWordCount);
		};
	}, [editor]);

	return (
		<div className="absolute bottom-2 right-2 flex items-center space-x-1">
			<div className="w-2 h-2 bg-blue-500 rounded-full" />
			<span className="text-xs text-black">{wordCount}</span>
		</div>
	);
};
