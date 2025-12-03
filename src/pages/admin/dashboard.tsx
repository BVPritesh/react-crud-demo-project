import ENDPOINTS from "@config/api";
import React, { useEffect, useState } from "react";
import { validatePostForm, type FormErrors } from "@utils/validation";
import { useAuth } from "@contexts/AuthContext";
import type { Post } from "@/types/types";
import useToast from "@hooks/useToast";
import AddEditPost from "@components/AddEditPost";

const Dashboard = (): React.ReactElement => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  // form state for adding/editing post
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ title?: string; body?: string }>({});
  const [adding, setAdding] = useState<boolean>(false);

  // editing state (null = adding new)
  const [editingId, setEditingId] = useState<number | null>(null);

  // deleting state
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // toast hook
  const { showToast, Toast } = useToast();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPosts = async (): Promise<void> => {
      setLoading(true);
      setApiError("");
      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(ENDPOINTS.POSTS, { method: "GET", headers, signal });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error((errBody as any)?.message || `Request failed: ${res.status}`);
        }

        const data: Post[] = await res.json();
        if (signal.aborted) return;
        setPosts(data.slice(0, 20));
      } catch (err: any) {
        if (signal.aborted) return;
        const message = err?.message ?? "An error occurred";
        setApiError(message);
        showToast(message, "error");
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [token]);

  // Validation using shared utils
  const validateForm = (): boolean => {
    const errors: FormErrors = validatePostForm(title, body);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // reset form values / editing state
  const resetForm = (): void => {
    setTitle("");
    setBody("");
    setFormErrors({});
    setEditingId(null);
    setAdding(false);
  };

  const handleAddPost = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;

    setAdding(true);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const isEdit = editingId !== null;
      const url = isEdit ? ENDPOINTS.POST_BY_ID(editingId!) : ENDPOINTS.POSTS;
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        id: editingId ?? undefined,
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      };

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || `Request failed: ${res.status}`);
      }

      if (isEdit) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingId ? { id: data.id ?? editingId!, title: data.title, body: data.body, userId: data.userId } : p
          )
        );
        showToast("Post updated successfully");
      } else {
        setPosts((prev) => [{ id: data.id ?? Date.now(), title: data.title, body: data.body, userId: data.userId }, ...prev]);
        showToast("Post added successfully", "success");
      }

      // use shared reset helper
      resetForm();
    } catch (err: any) {
      const message = err?.message ?? "An error occurred while saving post";
      setApiError(message);
      showToast(message, "error");
    } finally {
      setAdding(false);
    }
  };

  // populate form to edit post
  const handleEditPost = (post: Post): void => {
    setTitle(post.title);
    setBody(post.body);
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = (): void => {
    setEditingId(null);
    setTitle("");
    setBody("");
    setFormErrors({});
  };

  // Delete post
  const handleDeletePost = async (id: number): Promise<void> => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    setApiError("");
    setDeletingId(id);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(ENDPOINTS.POST_BY_ID(id), {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        let errBody = {};
        try {
          errBody = await res.json();
        } catch { /* empty */ }
        throw new Error((errBody as any)?.message || `Delete failed: ${res.status}`);
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Post deleted successfully", "success");
    } catch (err: any) {
      const message = err?.message ?? "An error occurred while deleting post";
      setApiError(message);
      showToast(message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Dashboard</h1>

      {/* Add / Update Post (separate component) */}
      <AddEditPost
        title={title}
        body={body}
        formErrors={formErrors}
        adding={adding}
        editingId={editingId}
        onTitleChange={setTitle}
        onBodyChange={setBody}
        onSubmit={handleAddPost}
        onCancel={handleCancelEdit}
      />

      {/* Posts list */}
      <div>
        {loading && <p className="text-gray-600">Loading posts...</p>}

        {apiError && <p className="text-red-600">Error: {apiError}</p>}

        {!loading && !apiError && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="text-sm text-gray-700 mt-2">{post.body}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-400">Post ID: {post.id}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditPost(post)} className="text-sm text-blue-600 hover:underline cursor-pointer">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-sm text-red-600 hover:underline cursor-pointer"
                      disabled={deletingId === post.id}
                    >
                      {deletingId === post.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {posts.length === 0 && !loading && <p className="text-gray-600">No posts available.</p>}
          </div>
        )}
      </div>

      {/* Toast (from hook) */}
      {Toast}
    </div>
  );
};

export default Dashboard;