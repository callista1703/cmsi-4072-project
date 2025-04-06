import React, { useState, useEffect } from "react"
import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"

// Import icons from lucide-react
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
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Interfaces 
interface Response {
  id: number
  content: string
}

interface Topic {
  id: number
  title: string
  content: string
  responses: Response[]
}

// WordCounter Component
const WordCounter: React.FC<{ editor: Editor | null }> = ({ editor }) => {
    const [wordCount, setWordCount] = useState(0)
    useEffect(() => {
      if (!editor) return
  
      const updateWordCount = () => {
        const text = editor.getText()
        const count = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
        setWordCount(count)
      }
  
      editor.on("update", updateWordCount)
      updateWordCount()
      return () => {
        editor.off("update", updateWordCount)
      }
    }, [editor])
    
    return (
      <div className="absolute bottom-2 right-2 flex items-center space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
        <span className="text-xs text-black">{wordCount}</span>
      </div>
    )
  }

// A reusable MenuBar for the Tiptap editor
const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null

  const addImage = () => {
    const url = prompt("Enter image URL")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = prompt("Enter link URL")
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  const removeLink = () => {
    editor.chain().focus().unsetLink().run()
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b pb-2 mb-2">
      <Button
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("underline") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button variant="outline" onClick={addLink} title="Add Link">
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" onClick={removeLink} title="Remove Link">
        <Unlink className="h-4 w-4" />
      </Button>
      <Button variant="outline" onClick={addImage} title="Insert Image">
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Main Discussion Page
const DiscussionPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [newTopicTitle, setNewTopicTitle] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  const topicEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  })

  const responseEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  })

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
      }
      setTopics([...topics, newTopic])
      setNewTopicTitle("")
      topicEditor.commands.clearContent()
    }
  }

  const handleAddResponse = () => {
    if (
      selectedTopic &&
      responseEditor &&
      responseEditor.getHTML().trim() !== "<p></p>"
    ) {
      const newResponse: Response = {
        id: Date.now(),
        content: responseEditor.getHTML(),
      }
      const updatedTopic: Topic = {
        ...selectedTopic,
        responses: [...selectedTopic.responses, newResponse],
      }
      setTopics((prev) =>
        prev.map((t) => (t.id === selectedTopic.id ? updatedTopic : t))
      )
      setSelectedTopic(updatedTopic)
      responseEditor.commands.clearContent()
    }
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {selectedTopic ? (
        <div>
          <Button onClick={() => setSelectedTopic(null)}>Back to Topics</Button>
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
            <MenuBar editor={responseEditor} />
            <EditorContent editor={responseEditor} />
            <WordCounter editor={responseEditor} />
          </div>
          <Button onClick={handleAddResponse}>Submit Response</Button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Discussion Board</h1>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Create a New Topic</h2>
            <Input
              placeholder="Topic Title"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              className="mb-2"
            />
            <div className="relative mb-2 p-2 border border-gray-300 rounded">
              <MenuBar editor={topicEditor} />
              <EditorContent editor={topicEditor} />
              <WordCounter editor={topicEditor} />
            </div>
            <Button onClick={handleAddTopic}>Add Topic</Button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Topics</h2>
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div
                  key={topic.id}
                  className="border p-3 rounded mb-3 cursor-pointer hover:bg-gray-100"
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
              <p className="text-gray-500">
                No topics created yet. Be the first to start a discussion!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscussionPage