// src/queries/discussions.ts
import { supabase } from "@/supabaseClient";

// Your application-level types
export type ResponseRow = {
  id: string;
  topic_id: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
};

export type TopicRow = {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  course_id: string;
  upvotes: number;
  created_at: string;
  Responses: ResponseRow[];
};

// Cast supabase to any so TS won’t complain about unknown table names
const sb = supabase as any;

/** Get all topics (with their responses), sorted newest first */
export async function fetchTopics(): Promise<TopicRow[]> {
  const { data, error } = await sb
    .from("Topics")
    .select(`
      id,
      title,
      content,
      author_id,
      author_name,
      course_id,
      upvotes,
      created_at,
      Responses (
        id,
        topic_id,
        content,
        author_id,
        author_name,
        created_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as TopicRow[];
}

/** Post a new topic and return the row (including nested empty Responses[]) */
export async function createTopic(
  title: string,
  content: string,
  course_id: string,
  author_id: string,
  author_name: string
): Promise<TopicRow> {
  const { data, error } = await sb
    .from("Topics")
    .insert({ title, content, course_id, author_id, author_name })
    .select(`
      id,
      title,
      content,
      author_id,
      author_name,
      course_id,
      upvotes,
      created_at,
      Responses (
        id,
        topic_id,
        content,
        author_id,
        author_name,
        created_at
      )
    `)
    .single();

  if (error || !data) throw error ?? new Error("Failed to create topic");
  return data as TopicRow;
}

/** Post a response under a topic and return the new comment row */
export async function createResponse(
  topic_id: string,
  content: string,
  author_id: string,
  author_name: string
): Promise<ResponseRow> {
  const { data, error } = await sb
    .from("Responses")
    .insert({ topic_id, content, author_id, author_name })
    .select("id, topic_id, content, author_id, author_name, created_at")
    .single();

  if (error || !data) throw error ?? new Error("Failed to post response");
  return data as ResponseRow;
}

/** Increment the upvotes counter on a topic by 1 */
export async function upvoteTopic(topicId: string): Promise<void> {
  const { error } = await sb
    .from("Topics")
    .update({ upvotes: sb.raw("upvotes + 1") })
    .eq("id", topicId);

  if (error) throw error;
}
