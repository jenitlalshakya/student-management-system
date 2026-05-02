"use client";

import { ChangeEvent, FormEvent } from "react";

interface StudentFormProps {
  form: {
    name: string;
    faculty: string;
    joining_year: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const StudentForm = ({
  form,
  onChange,
  onSubmit,
}: StudentFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
    >
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={form.name}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-black bg-white"
        required
      />

      <input
        type="text"
        name="faculty"
        placeholder="Faculty"
        value={form.faculty}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-black bg-white"
        required
      />

      <input
        type="number"
        name="joining_year"
        placeholder="Joining Year"
        value={form.joining_year}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-black bg-white"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700"
      >
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
