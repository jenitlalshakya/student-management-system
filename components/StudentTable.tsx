"use client";

import { FaTrash, FaEdit } from "react-icons/fa";
import { Student } from "@/types";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentTable = ({
  students,
  onEdit,
  onDelete,
}: StudentTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Faculty</th>
            <th className="p-3">Joining Year</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="text-center border-t hover:bg-gray-50 text-black"
            >
              <td className="p-3">{student.id}</td>
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.faculty}</td>
              <td className="p-3">{student.joining_year}</td>
              <td className="p-3 flex justify-center gap-3">
                <button
                  onClick={() => onEdit(student)}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  aria-label="Delete Student"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
