"use client";

import { ChangeEvent, FormEvent } from "react";
import { Student } from "@/types";

interface UpdateStudentFormProps {
  form: {
    name: string;
    faculty: string;
    joining_year: string;
  };
  studentId: number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const UpdateStudentForm = ({
  form,
  studentId,
  onChange,
  onSubmit,
  onClose,
}: UpdateStudentFormProps) => {
  if (!studentId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Update Student
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="faculty"
            placeholder="Faculty"
            value={form.faculty}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="joining_year"
            placeholder="Joining Year"
            value={form.joining_year}
            onChange={onChange}
            className="w-full border p-3 rounded"
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentForm;
