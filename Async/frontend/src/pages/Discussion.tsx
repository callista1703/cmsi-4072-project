// src/pages/discussions.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditorBar } from "@/components/discussion/EditorBar";
import { WordCount } from "@/components/discussion/WordCount";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ThumbsUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { allCoursesQueryOptions } from "@/queries/courses";
import {
  fetchTopics,
  createTopic,
  createResponse,
  upvoteTopic,
  TopicRow,
  ResponseRow,
} from "@/queries/discussions";
import { supabase } from "@/supabaseClient";
import type { PostgrestError } from "@supabase/supabase-js";

export default function DiscussionPage() {
  const qc = useQueryClient();
  const { session } = useAuth();
  const user = session!.user;
  const meta = (user.user_metadata as any) ?? {};
  const currentUserName =
    meta.firstName && meta.lastName
      ? `${meta.firstName} ${meta.lastName}`
      : "You";
  const userInitials = currentUserName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  // 1) Fetch enrolled courses for filtering
  const { data: courses = [] } = useQuery(allCoursesQueryOptions());

  // 2) Fetch topics + nested responses
  const {
    data: rawTopics,
    isLoading,
    isError,
  } = useQuery<TopicRow[], PostgrestError>(
    { queryKey: ["topics"], queryFn: fetchTopics }
  );
  const topics: TopicRow[] = rawTopics ?? [];

  // 3) Subscribe to realtime changes
  useEffect(() => {
    const topicChannel = supabase
      .channel("topics")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Topics" },
        () => qc.invalidateQueries({ queryKey: ["topics"] })
      )
      .subscribe();

    const responseChannel = supabase
      .channel("responses")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Responses" },
        () => qc.invalidateQueries({ queryKey: ["topics"] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(topicChannel);
      supabase.removeChannel(responseChannel);
    };
  }, [qc]);

  // UI state
  const [selectedTopic, setSelectedTopic] = useState<TopicRow | null>(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicCourseId, setNewTopicCourseId] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [courseFilter, setCourseFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Tiptap editors
  const topicEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const responseEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: { attributes: { class: "min-h-[120px] focus:outline-none" } },
  });

  // Create a new topic
  const handleAddTopic = async () => {
    if (
      !newTopicTitle.trim() ||
      !newTopicCourseId ||
      !topicEditor ||
      topicEditor.getHTML().trim() === "<p></p>"
    )
      return;

    await createTopic(
      newTopicTitle.trim(),
      topicEditor.getHTML(),
      newTopicCourseId,
      user.id,
      currentUserName
    );
    topicEditor.commands.clearContent();
    setNewTopicTitle("");
    setNewTopicCourseId("");
    setShowNewThread(false);
    qc.invalidateQueries({ queryKey: ["topics"] });
  };

  // Post a response
  const handleAddResponse = async () => {
    if (
      !selectedTopic ||
      !responseEditor ||
      responseEditor.getHTML().trim() === "<p></p>"
    )
      return;

    await createResponse(
      selectedTopic.id,
      responseEditor.getHTML(),
      user.id,
      currentUserName
    );
    responseEditor.commands.clearContent();
    qc.invalidateQueries({ queryKey: ["topics"] });
  };

  // Upvote
  const handleUpvote = async (topic: TopicRow) => {
    await upvoteTopic(topic.id);
    qc.invalidateQueries({ queryKey: ["topics"] });
  };

  // Only show threads for courses I’m enrolled in
  const enrolledCourseIds = courses.map((c) => c.course_id);
  let visible = topics.filter((t) =>
    enrolledCourseIds.includes(t.course_id)
  );

  // Further filter / search
  visible = visible.filter((t) => {
    const courseMatch =
      !courseFilter || t.course_id === courseFilter;
    const textMatch = t.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return courseMatch && textMatch;
  });

  // Sort
  const sorted = [...visible].sort((a, b) =>
    sortBy === "latest"
      ? new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      : b.upvotes - a.upvotes
  );

  if (isLoading)
    return <div className="p-6">Loading discussions…</div>;
  if (isError)
    return (
      <div className="p-6 text-red-600">
        Error loading discussions.
      </div>
    );

  return (
    <div className="p-6 w-full">
      {selectedTopic ? (
        <>
          {/* Back button */}
          <Button
            variant="ghost"
            className="flex items-center gap-1 mb-4"
            onClick={() => setSelectedTopic(null)}
          >
            <ArrowLeft /> Back to Topics
          </Button>

          {/* Topic header */}
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback>
                {selectedTopic.author_name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                {selectedTopic.title}
              </h1>
              <p className="text-gray-600">
                by {selectedTopic.author_name}
              </p>
            </div>
            <Button
              variant="ghost"
              className={`ml-auto p-1 ${
                selectedTopic.upvotes > 0
                  ? "text-blue-600"
                  : ""
              }`}
              onClick={() => handleUpvote(selectedTopic)}
            >
              <ThumbsUp className="w-5 h-5" />{" "}
              {selectedTopic.upvotes}
            </Button>
          </div>

          {/* Topic content */}
          <div
            className="prose mb-8"
            dangerouslySetInnerHTML={{
              __html: selectedTopic.content,
            }}
          />

          {/* Responses */}
          <h2 className="text-2xl font-semibold mb-4">
            Responses
          </h2>
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto">
            {selectedTopic.Responses
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((resp: ResponseRow) => (
                <div
                  key={resp.id}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {resp.author_name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">
                      {resp.author_name}{" "}
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(resp.created_at).toLocaleString()}
                      </span>
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: resp.content,
                      }}
                    />
                  </div>
                </div>
              ))}
            {selectedTopic.Responses.length === 0 && (
              <p className="text-gray-500">No responses yet.</p>
            )}
          </div>

          {/* Response editor (capped) */}
          <div className="mb-4 p-4 border rounded-lg bg-white shadow-sm relative max-h-[40vh] overflow-y-auto">
            <EditorBar editor={responseEditor!} />
            <EditorContent editor={responseEditor!} />
            <WordCount editor={responseEditor!} />
          </div>
          <Button onClick={handleAddResponse}>
            Submit Response
          </Button>
        </>
      ) : (
        <>
          {/* Discussion list header */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Discussions</h1>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`cursor-pointer ${
                  sortBy === "latest"
                    ? "underline font-semibold"
                    : ""
                }`}
                onClick={() => setSortBy("latest")}
              >
                Latest
              </span>
              <span
                className={`cursor-pointer ${
                  sortBy === "popular"
                    ? "underline font-semibold"
                    : ""
                }`}
                onClick={() => setSortBy("popular")}
              >
                Popular
              </span>
              <select
                value={courseFilter}
                onChange={(
                  e: ChangeEvent<HTMLSelectElement>
                ) => setCourseFilter(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="">
                  All Enrolled Courses
                </option>
                {courses.map((c) => (
                  <option
                    key={c.course_id}
                    value={c.course_id}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Search topics…"
                value={searchTerm}
                onChange={(
                  e: ChangeEvent<HTMLInputElement>
                ) => setSearchTerm(e.target.value)}
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

          {/* New thread form */}
          {showNewThread && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  You
                </span>
              </div>
              <Input
                placeholder="Thread title"
                value={newTopicTitle}
                onChange={(
                  e: ChangeEvent<HTMLInputElement>
                ) => setNewTopicTitle(e.target.value)}
                className="mb-4"
              />
              <select
                value={newTopicCourseId}
                onChange={(
                  e: ChangeEvent<HTMLSelectElement>
                ) =>
                  setNewTopicCourseId(e.target.value)
                }
                className="border mb-4 rounded px-2 py-1 w-full"
              >
                <option value="">
                  Select Course
                </option>
                {courses.map((c) => (
                  <option
                    key={c.course_id}
                    value={c.course_id}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="border p-2 mb-4 rounded-lg relative max-h-[40vh] overflow-y-auto">
                <EditorBar editor={topicEditor!} />
                <EditorContent editor={topicEditor!} />
                <WordCount editor={topicEditor!} />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setShowNewThread(false)
                  }
                >
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

          {/* Active discussions list */}
          <div className="rounded-xl p-4 border bg-card shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Active Discussions
            </h2>
            <div className="space-y-6">
              {sorted.map((topic) => (
                <div
                  key={topic.id}
                  className="flex gap-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() =>
                    setSelectedTopic(topic)
                  }
                >
                  <Avatar className="w-16 h-16 flex-shrink-0">
                    <AvatarFallback>
                      {topic.author_name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {topic.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-1 ${
                          topic.upvotes > 0
                            ? "text-blue-600"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(topic);
                        }}
                      >
                        <ThumbsUp className="w-5 h-5" />{" "}
                        {topic.upvotes}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      by {topic.author_name}
                    </p>
                    <div
                      className="text-gray-700 line-clamp-2 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: topic.content,
                      }}
                    />
                    <p className="text-sm text-gray-500">
                      {topic.Responses.length}{" "}
                      {topic.Responses.length === 1
                        ? "reply"
                        : "replies"}
                    </p>
                  </div>
                </div>
              ))}
              {sorted.length === 0 && (
                <p className="text-gray-500">
                  No discussions found.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
