"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import StudentForm from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";
import UpdateStudentForm from "@/components/UpdateStudentForm";
import { Student } from "@/types";
import Footer from "@/components/Footer";

const Home = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    faculty: "",
    joining_year: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    faculty: "",
    joining_year: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();

      const sorted = Array.isArray(data)
        ? [...data].sort((a, b) => a.id - b.id)
        : [];
      
      setStudents(sorted);
    } catch (error) {
      console.error(error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    document.body.style.overflow = editingStudentId !== null ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editingStudentId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        joining_year: Number(form.joining_year),
      }),
    });

    setForm({
      name: "",
      faculty: "",
      joining_year: "",
    });

    fetchStudents();
  };

  const handleEdit = (student: Student) => {
    setEditingStudentId(student.id);

    setEditForm({
      name: student.name,
      faculty: student.faculty,
      joining_year: String(student.joining_year),
    });
  };

  const closeUpdate = () => {
    setEditingStudentId(null);

    setEditForm({
      name: "",
      faculty: "",
      joining_year: "",
    });
  };

  const updateStudent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingStudentId === null) return;

    await fetch(`/api/students/${editingStudentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editForm,
        joining_year: Number(editForm.joining_year),
      }),
    });

    closeUpdate();
    fetchStudents();
  };

  const deleteStudent = async (id: number) => {
    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 text-black flex flex-col">
      <main className="flex-1">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Student Management System
          </h1>
          {!editingStudentId && (
            <StudentForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
          {editingStudentId !== null && (
            <UpdateStudentForm
              form={editForm}
              studentId={editingStudentId}
              onChange={handleEditChange}
              onSubmit={updateStudent}
              onClose={closeUpdate}
            />
          )}
          <StudentTable
            students={students}
            onEdit={handleEdit}
            onDelete={deleteStudent}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
