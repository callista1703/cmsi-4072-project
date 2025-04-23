import React, { useState, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WordCount } from "@/components/discussion/WordCount";
import { EditorBar } from "@/components/discussion/EditorBar";
import { ArrowLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Interfaces
interface Response {
	id: number;
	content: string;
}

interface Topic {
	id: number;
	title: string;
	content: string;
	responses: Response[];
}

// Main Discussion Page
const DiscussionPage: React.FC = () => {
	const [topics, setTopics] = useState<Topic[]>([
		{
			id: 1,
			title: "Sample Topic",
			content: "<p>Sample content</p>",
			responses: [],
		},
	]);
	const [newTopicTitle, setNewTopicTitle] = useState("");
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

	const topicEditor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Image,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: "",
	});

	const responseEditor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Image,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: "",
		editorProps: {
			attributes: {
				class: "min-h-30 focus: outline-none",
			},
		},
	});

	const handleAddTopic = () => {
		if (
			newTopicTitle.trim() &&
			topicEditor &&
			topicEditor.getHTML().trim() !== "<p></p>"
		) {
			const newTopic: Topic = {
				id: Date.now(),
				title: newTopicTitle,
				content: topicEditor.getHTML(),
				responses: [],
			};
			setTopics([...topics, newTopic]);
			setNewTopicTitle("");
			topicEditor.commands.clearContent();
		}
	};

	const handleAddResponse = () => {
		if (
			selectedTopic &&
			responseEditor &&
			responseEditor.getHTML().trim() !== "<p></p>"
		) {
			const newResponse: Response = {
				id: Date.now(),
				content: responseEditor.getHTML(),
			};
			const updatedTopic: Topic = {
				...selectedTopic,
				responses: [...selectedTopic.responses, newResponse],
			};
			setTopics((prev) =>
				prev.map((t) => (t.id === selectedTopic.id ? updatedTopic : t))
			);
			setSelectedTopic(updatedTopic);
			responseEditor.commands.clearContent();
		}
	};

	return (
		<div className="p-6 w-full ">
			{selectedTopic ? (
				<div>
					<Button
						variant={"ghost"}
						onClick={() => setSelectedTopic(null)}
						className="cursor-pointer"
					>
						<ArrowLeft className="text-gray-500" />
						<p>Back to Topics</p>
					</Button>
					<h1 className="text-3xl font-bold my-4">{selectedTopic.title}</h1>
					<div
						className="mb-6"
						dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
					/>
					<h2 className="text-2xl font-semibold mb-2">Responses</h2>
					<div className="space-y-4 mb-6">
						{selectedTopic.responses.length > 0 ? (
							selectedTopic.responses.map((response) => (
								<div
									key={response.id}
									className="border p-3 rounded"
									dangerouslySetInnerHTML={{ __html: response.content }}
								/>
							))
						) : (
							<p className="text-gray-500">No responses yet.</p>
						)}
					</div>
					<div className="relative mb-4 p-2 border border-gray-300 rounded">
						<EditorBar editor={responseEditor} />
						<EditorContent editor={responseEditor} />
						<WordCount editor={responseEditor} />
					</div>
					<Button onClick={handleAddResponse}>Submit Response</Button>
				</div>
			) : (
				<div>
					<div className="flex gap-2 items-center mb-3">
						<SidebarTrigger />
						<h1 className="text-xl font-bold">Discussions</h1>
					</div>
					<div className="rounded-xl p-4 border bg-card shadow-sm">
						<h2 className="text-xl font-semibold mb-6">Active Discussions</h2>
						{topics.length > 0 ? (
							topics.map((topic) => (
								<div
									key={topic.id}
									className="border p-3  mb-3 cursor-pointer hover:bg-gray-100 rounded-lg"
									onClick={() => setSelectedTopic(topic)}
								>
									<h3 className="text-xl font-bold">{topic.title}</h3>
									<div
										className="text-gray-600"
										dangerouslySetInnerHTML={{ __html: topic.content }}
									/>
									{topic.responses.length > 0 && (
										<p className="text-sm text-gray-500 mt-1">
											{topic.responses.length}{" "}
											{topic.responses.length === 1 ? "response" : "responses"}
										</p>
									)}
								</div>
							))
						) : (
							<p className="text-gray-500">No Discussions created yet.</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default DiscussionPage;
