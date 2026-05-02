import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const GET = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM student_records ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch students" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { name, faculty, joining_year } = await request.json();

    await pool.query(
      "INSERT INTO student_records (name, faculty, joining_year) VALUES (?, ?, ?)",
      [name, faculty, joining_year]
    );

    return NextResponse.json({
      success: true,
      message: "Student added successfully"
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to add student" },
      { status: 500 }
    );
  }
};
