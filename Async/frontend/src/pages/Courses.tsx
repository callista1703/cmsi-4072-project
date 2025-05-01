import React, { useState, ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { PostgrestError } from "@supabase/supabase-js";
import { allCoursesQueryOptions, CourseRow } from "@/queries/courses";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const Courses: React.FC = () => {
  const { session } = useAuth();
  const role = (session?.user.user_metadata as any)?.role;
  const userId = session?.user.id ?? "";

  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CourseRow[], PostgrestError>(allCoursesQueryOptions());

  const [joinOpen, setJoinOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  const handleJoin = async () => {
    const code = joinCode.trim().toUpperCase();
    const { data, error: findErr } = await supabase
      .from("Courses")
      .select("course_id")
      .eq("code", code)
      .single();
    if (findErr || !data) {
      alert(`No course found for code: ${code}`);
      return;
    }
    const { error: enrollErr } = await supabase
      .from("Enrollments")
      .insert({
        enrollment_id: uuidv4(),
        user_id: userId,
        course_id: data.course_id,
      });
    if (enrollErr) {
      alert("Error joining course: " + enrollErr.message);
    } else {
      alert("Successfully joined!");
      setJoinOpen(false);
      refetch();
    }
  };

  const handleCreate = async () => {
    const code = uuidv4().slice(0, 8).toUpperCase();
    const { data, error: createErr } = await supabase
      .from("Courses")
      .insert(
        {
          course_id: uuidv4(),
          name: newName,
          description: newDesc,
          instructor_id: userId,
          code,
        } as any 
      )
      .select("*")
      .single();

    if (createErr || !data) {
      alert("Error creating course: " + createErr?.message);
    } else {
      const newCourse = data as CourseRow;
      setCreatedCode(newCourse.code);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-6 w-full px-6">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center mb-3">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Courses</h1>
          </div>
          <Button disabled>Join Course</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden border-transparent animate-pulse">
                <CardHeader className="bg-muted p-4">
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="p-8">Error: {(error as PostgrestError).message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 pt-6 w-full px-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Courses</h1>
        </div>
        <div className="flex gap-2">
          <Dialog.Root open={joinOpen} onOpenChange={setJoinOpen}>
            <Dialog.Trigger asChild>
              <Button>Join Course</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg">
                <Dialog.Title className="text-lg font-bold mb-4">
                  Join Course by Code
                </Dialog.Title>
                <label htmlFor="join-code" className="block text-sm font-medium mb-1">
                  Course Code
                </label>
                <Input
                  id="join-code"
                  value={joinCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value)}
                  placeholder="e.g. ABCD1234"
                  className="mb-4"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setJoinOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleJoin}>Join</Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {role === "Teacher" && (
            <Dialog.Root
              open={createOpen}
              onOpenChange={(open) => {
                setCreateOpen(open);
                if (!open) {
                  setCreatedCode(null);
                  setNewName("");
                  setNewDesc("");
                }
              }}
            >
              <Dialog.Trigger asChild>
                <Button>Create Course</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg">
                  <Dialog.Title className="text-lg font-bold mb-4">
                    {createdCode ? "Course Created!" : "Create New Course"}
                  </Dialog.Title>

                  {createdCode ? (
                    <>
                      <p className="mb-4">Your course is live.</p>
                      <label className="block text-sm font-medium mb-1">
                        Course Code
                      </label>
                      <div className="flex items-center gap-2 mb-4">
                        <code className="px-2 py-1 bg-gray-100 rounded">
                          {createdCode}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigator.clipboard.writeText(createdCode)}
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => setCreateOpen(false)}>Done</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor="course-name" className="block text-sm font-medium mb-1">
                        Course Name
                      </label>
                      <Input
                        id="course-name"
                        value={newName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                        className="mb-4"
                      />
                      <label htmlFor="course-desc" className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <Input
                        id="course-desc"
                        value={newDesc}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDesc(e.target.value)}
                        className="mb-4"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setCreateOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreate}>Create</Button>
                      </div>
                    </>
                  )}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: CourseRow) => (
          <Link
            to="/courses/$courseId"
            params={{ courseId: course.course_id }}
            key={course.course_id}
          >
            <Card className="overflow-hidden transition-shadow hover:shadow-xl">
              <CardHeader className="bg-muted p-4">
                <CardTitle className="text-lg">{course.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {course.description}
                </p>
                <p className="text-xs uppercase text-muted-foreground">
                  Code: {course.code}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
