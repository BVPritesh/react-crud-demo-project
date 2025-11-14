import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

type Post = {
  userId?: number;
  id: number;
  title: string;
  body: string;
};

export default function Dashboard(): JSX.Element {
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

  // simple toast
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      setLoading(true);
      setApiError("");
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "GET",
          headers,
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody?.message || `Request failed: ${res.status}`);
        }

        const data: Post[] = await res.json();
        if (mounted) {
          // optional: limit items shown for performance
          setPosts(data.slice(0, 20));
        }
      } catch (err: any) {
        if (mounted) setApiError(err?.message ?? "An error occurred");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPosts();
    return () => {
      mounted = false;
    };
  }, [token]);

  // Validation rules
  const titleRegex = /^[A-Za-z\s]+$/; // letters and spaces only
  const bodyRegex = /^[A-Za-z0-9\s]+$/; // letters, numbers and spaces only

  function validateForm() {
    const errors: { title?: string; body?: string } = {};
    if (!title.trim()) {
      errors.title = "Post title is required";
    } else if (!titleRegex.test(title.trim())) {
      errors.title = "Title must contain letters and spaces only";
    }

    if (!body.trim()) {
      errors.body = "Post body is required";
    } else if (!bodyRegex.test(body.trim())) {
      errors.body = "Body may contain only letters, numbers and spaces";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function showToast(message: string) {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  }

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setAdding(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // If editingId is present, call PUT to update that post
      const isEdit = editingId !== null;
      const url = isEdit
        ? `https://jsonplaceholder.typicode.com/posts/${editingId}`
        : "https://jsonplaceholder.typicode.com/posts";
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
        // replace updated post in list
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingId ? { id: data.id ?? editingId!, title: data.title, body: data.body, userId: data.userId } : p
          )
        );
        showToast("Post updated successfully");
      } else {
        // prepend new post to list (jsonplaceholder returns an id)
        setPosts((prev) => [{ id: data.id ?? Date.now(), title: data.title, body: data.body, userId: data.userId }, ...prev]);
        showToast("Post added successfully");
      }

      // reset form + editing state
      setTitle("");
      setBody("");
      setFormErrors({});
      setEditingId(null);
    } catch (err: any) {
      const message = err?.message ?? "An error occurred while saving post";
      setApiError(message);
      showToast(message);
    } finally {
      setAdding(false);
    }
  }

  // populate form to edit post
  function handleEditPost(post: Post) {
    setTitle(post.title);
    setBody(post.body);
    setEditingId(post.id);
    // scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTitle("");
    setBody("");
    setFormErrors({});
  }

  // Delete post
  async function handleDeletePost(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    setApiError("");
    setDeletingId(id);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
        headers,
      });

      // jsonplaceholder returns {}, treat any 2xx as success
      if (!res.ok) {
        let errBody = {};
        try {
          errBody = await res.json();
        } catch {}
        throw new Error((errBody as any)?.message || `Delete failed: ${res.status}`);
      }

      // optimistic update: remove from list
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Post deleted successfully");
    } catch (err: any) {
      const message = err?.message ?? "An error occurred while deleting post";
      setApiError(message);
      showToast(message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Dashboard</h1>

      {/* Add / Update Post */}
      <div className="mb-8 pb-8 border-b border-gray-300 mt-4 pt-5 border-t">
        <h2 className="capitalize font-medium">{editingId ? "Update post" : "Add new post"}</h2>
        <form className="mb-0 flex flex-col sm:flex-row gap-3 items-start" onSubmit={handleAddPost}>
          <div className="w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Post Title"
              className="border p-2 mr-2 rounded w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={!!formErrors.title}
            />
            {formErrors.title && <div className="text-red-600 text-sm mt-1">{formErrors.title}</div>}
          </div>

          <div className="w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Post Body"
              className="border p-2 mr-2 rounded w-full"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-invalid={!!formErrors.body}
            />
            {formErrors.body && <div className="text-red-600 text-sm mt-1">{formErrors.body}</div>}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
              disabled={adding}
            >
              {adding ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update" : "Add Post"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                disabled={adding}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

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
                    <button onClick={() => handleEditPost(post)} className="text-sm text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-sm text-red-600 hover:underline"
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

      {/* Toast */}
      {isToastVisible && (
        <div className="fixed right-4 top-4 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}