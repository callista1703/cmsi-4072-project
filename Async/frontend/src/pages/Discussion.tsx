import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditorBar } from "@/components/discussion/EditorBar";
import { WordCount } from "@/components/discussion/WordCount";
import { ArrowLeft, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { allCoursesQueryOptions } from "@/queries/courses";
import defaultAvatar from "@/assets/default.png";

interface Response {
  id: number;
  content: string;
  authorName: string;
  avatarUrl: string;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  responses: Response[];
  authorName: string;
  avatarUrl: string;
  upvotes: number;
  courseId: string;
}

const DiscussionPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: Date.now(),
      title: "Sample Topic",
      content: "<p>Sample content</p>",
      responses: [],
      authorName: "Alice",
      avatarUrl: defaultAvatar,
      upvotes: 0,
      courseId: "",
    },
  ]);
  const [upvoted, setUpvoted] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicCourseId, setNewTopicCourseId] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [courseFilter, setCourseFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: courses = [] } = useQuery(allCoursesQueryOptions());

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
    editorProps: { attributes: { class: "min-h-[120px] focus:outline-none" } },
  });

  const handleUpvote = (topicId: number) => {
    const hasUpvoted = upvoted.includes(topicId);
    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? { ...t, upvotes: t.upvotes + (hasUpvoted ? -1 : 1) }
          : t
      )
    );
    if (hasUpvoted) {
      setUpvoted((prev) => prev.filter((id) => id !== topicId));
    } else {
      setUpvoted((prev) => [...prev, topicId]);
    }
    if (selectedTopic?.id === topicId) {
      setSelectedTopic((t) =>
        t
          ? { ...t, upvotes: t.upvotes + (hasUpvoted ? -1 : 1) }
          : t
      );
    }
  };

  const handleAddTopic = () => {
    if (
      newTopicTitle.trim() &&
      newTopicCourseId &&
      topicEditor &&
      topicEditor.getHTML().trim() !== "<p></p>"
    ) {
      const newTopic: Topic = {
        id: Date.now(),
        title: newTopicTitle.trim(),
        content: topicEditor.getHTML(),
        responses: [],
        authorName: "You",
        avatarUrl: defaultAvatar,
        upvotes: 0,
        courseId: newTopicCourseId,
      };
      setTopics([newTopic, ...topics]);
      setNewTopicTitle("");
      setNewTopicCourseId("");
      topicEditor.commands.clearContent();
      setShowNewThread(false);
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
        authorName: "You",
        avatarUrl: defaultAvatar,
      };
      const updated = {
        ...selectedTopic,
        responses: [...selectedTopic.responses, newResponse],
      };
      setTopics((prev) =>
        prev.map((t) => (t.id === selectedTopic.id ? updated : t))
      );
      setSelectedTopic(updated);
      responseEditor.commands.clearContent();
    }
  };

  const filtered = topics.filter((t) => {
    const matchCourse = !courseFilter || t.courseId === courseFilter;
    const matchSearch = t.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCourse && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "latest" ? b.id - a.id : b.upvotes - a.upvotes
  );

  return (
    <div className="p-6 w-full">
      {selectedTopic ? (
        <>
          <Button
            variant="ghost"
            onClick={() => setSelectedTopic(null)}
            className="flex items-center gap-1 mb-4"
          >
            <ArrowLeft /> Back to Topics
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={selectedTopic.avatarUrl}
              alt={selectedTopic.authorName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{selectedTopic.title}</h1>
              <p className="text-gray-600">by {selectedTopic.authorName}</p>
            </div>
            <Button
              variant="ghost"
              className={`ml-auto p-1 ${
                upvoted.includes(selectedTopic.id) ? "text-blue-600" : ""
              }`}
              onClick={() => handleUpvote(selectedTopic.id)}
            >
              <ThumbsUp className="w-5 h-5" /> {selectedTopic.upvotes}
            </Button>
          </div>

          <div
            className="prose mb-8"
            dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
          />

          <h2 className="text-2xl font-semibold mb-4">Responses</h2>
          <div className="space-y-4 mb-6">
            {selectedTopic.responses.length > 0 ? (
              selectedTopic.responses.map((resp) => (
                <div
                  key={resp.id}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={resp.avatarUrl}
                    alt={resp.authorName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm mb-1">
                      {resp.authorName}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: resp.content }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No responses yet.</p>
            )}
          </div>

          <div className="mb-4 p-4 border rounded-lg bg-white shadow-sm relative">
            <EditorBar editor={responseEditor} />
            <EditorContent editor={responseEditor} />
            <WordCount editor={responseEditor} />
          </div>
          <Button onClick={handleAddResponse}>Submit Response</Button>
        </>
      ) : (
        <>
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Discussions</h1>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`cursor-pointer ${
                  sortBy === "latest" ? "underline font-semibold" : ""
                }`}
                onClick={() => setSortBy("latest")}
              >
                Latest
              </span>
              <span
                className={`cursor-pointer ${
                  sortBy === "popular" ? "underline font-semibold" : ""
                }`}
                onClick={() => setSortBy("popular")}
              >
                Popular
              </span>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Search topics…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
              <Button
                variant="default"
                className="bg-blue-900 text-white"
                onClick={() => setShowNewThread((f) => !f)}
              >
                + New Thread
              </Button>
            </div>
          </div>

          {showNewThread && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={defaultAvatar}
                  alt="You"
                  className="w-16 h-16 rounded-full"
                />
                <span className="font-semibold">You</span>
              </div>
              <Input
                placeholder="Thread title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                className="mb-4"
              />
              <select
                value={newTopicCourseId}
                onChange={(e) => setNewTopicCourseId(e.target.value)}
                className="border mb-4 rounded px-2 py-1 w-full"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="border p-2 mb-4 rounded-lg relative">
                <EditorBar editor={topicEditor} />
                <EditorContent editor={topicEditor} />
                <WordCount editor={topicEditor} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowNewThread(false)}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-900 text-white"
                  onClick={handleAddTopic}
                >
                  Post Thread
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-xl p-4 border bg-card shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Active Discussions
            </h2>
            <div className="space-y-6">
              {sorted.map((topic) => (
                <div
                  key={topic.id}
                  className="flex gap-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <img
                    src={topic.avatarUrl}
                    alt={topic.authorName}
                    className="w-16 h-16 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {topic.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-1 ${
                          upvoted.includes(topic.id)
                            ? "text-blue-600"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(topic.id);
                        }}
                      >
                        <ThumbsUp className="w-5 h-5" /> {topic.upvotes}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      by {topic.authorName}
                    </p>
                    <div
                      className="text-gray-700 line-clamp-2 mb-2"
                      dangerouslySetInnerHTML={{ __html: topic.content }}
                    />
                    <p className="text-sm text-gray-500">
                      {topic.responses.length}{" "}
                      {topic.responses.length === 1
                        ? "reply"
                        : "replies"}
                    </p>
                  </div>
                </div>
              ))}
              {sorted.length === 0 && (
                <p className="text-gray-500">No discussions found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscussionPage;
