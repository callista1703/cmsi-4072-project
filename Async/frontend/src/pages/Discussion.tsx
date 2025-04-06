import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const DiscussionPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [newResponse, setNewResponse] = useState("");

  const handleAddTopic = () => {
    if (newTopicTitle.trim() && newTopicContent.trim()) {
      const newTopic: Topic = {
        id: Date.now(),
        title: newTopicTitle,
        content: newTopicContent,
        responses: [],
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle("");
      setNewTopicContent("");
    }
  };

  const handleAddResponse = () => {
    if (selectedTopic && newResponse.trim()) {
      const response: Response = {
        id: Date.now(),
        content: newResponse,
      };
      const updatedTopic: Topic = {
        ...selectedTopic,
        responses: [...selectedTopic.responses, response],
      };
      setTopics(topics.map((t) => (t.id === selectedTopic.id ? updatedTopic : t)));
      setSelectedTopic(updatedTopic);
      setNewResponse("");
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {selectedTopic ? (
        <div>
          <Button onClick={() => setSelectedTopic(null)}>Back to Topics</Button>
          <h1 className="text-3xl font-bold my-4">{selectedTopic.title}</h1>
          <p className="mb-6">{selectedTopic.content}</p>
          <h2 className="text-2xl font-semibold mb-2">Responses</h2>
          <div className="space-y-4 mb-6">
            {selectedTopic.responses.length > 0 ? (
              selectedTopic.responses.map((response) => (
                <div key={response.id} className="border p-3 rounded">
                  {response.content}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No responses yet.</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              placeholder="Write a response..."
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleAddResponse}>Submit Response</Button>
          </div>
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
            <textarea
              placeholder="Topic Content"
              value={newTopicContent}
              onChange={(e) => setNewTopicContent(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
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
                  <p className="text-gray-600">{topic.content}</p>
                  {topic.responses.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {topic.responses.length} {topic.responses.length === 1 ? "response" : "responses"}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No topics created yet. Be the first to start a discussion!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionPage;