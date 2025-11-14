import React from "react";
import type { FormErrors } from "@utils/validation";

type Props = {
  title: string;
  body: string;
  formErrors: FormErrors;
  adding: boolean;
  editingId: number | null;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
  onCancel: () => void;
};

const AddEditPost = ({
  title,
  body,
  formErrors,
  adding,
  editingId,
  onTitleChange,
  onBodyChange,
  onSubmit,
  onCancel,
}: Props): React.ReactElement => {
  return (
    <div className="mb-8 pb-8 border-b border-gray-300 mt-4 pt-5 border-t">
      <h2 className="capitalize font-medium">{editingId ? "Update post" : "Add new post"}</h2>

      <form className="mb-0 flex flex-col sm:flex-row gap-3 items-start" onSubmit={onSubmit}>
        <div className="w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Post Title"
            className="border p-2 mr-2 rounded w-full"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
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
            onChange={(e) => onBodyChange(e.target.value)}
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
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
              disabled={adding}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEditPost;