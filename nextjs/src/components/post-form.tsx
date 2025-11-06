'use client';

import { useFormState, useFormStatus } from 'react-dom';

interface PostFormProps {
  action: (state: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | void>;
  initialTitle?: string;
  initialBody?: string;
  submitLabel: string;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? 'Saving...' : label}
    </button>
  );
}

const initialState: { error?: string } = {};

export default function PostForm({ action, initialTitle = '', initialBody = '', submitLabel }: PostFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && <div className="alert alert-error">{state.error}</div>}
      <div className="form-control">
        <label className="label" htmlFor="title">
          <span className="label-text">Title</span>
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={initialTitle}
          className="input input-bordered"
          maxLength={255}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="body">
          <span className="label-text">Content</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={8}
          defaultValue={initialBody}
          className="textarea textarea-bordered"
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
