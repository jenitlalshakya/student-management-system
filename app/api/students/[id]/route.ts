// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export const PUT = async (
//   request: Request,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const { id } = params;
//     const { name, faculty, joining_year } = await request.json();

//     await pool.query(
//       "UPDATE student_records SET name=?, faculty=?, joining_year=? WHERE id=?",
//       [name, faculty, joining_year, id]
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Student updated successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Failed to update student" },
//       { status: 500 }
//     );
//   }
// };

// export const DELETE = async (
//   request: Request,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const { id } = await params;

//     await pool.query("DELETE FROM student_records WHERE id=?", [id]);

//     return NextResponse.json({
//       success: true,
//       message: "Student deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete student" },
//       { status: 500 }
//     );
//   }
// };




import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const { name, faculty, joining_year } = await request.json();

    await pool.query(
      "UPDATE student_records SET name = ?, faculty = ?, joining_year = ? WHERE id = ?",
      [name, faculty, joining_year, Number(id)]
    );

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update student",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    await pool.query(
      "DELETE FROM student_records WHERE id = ?",
      [Number(id)]
    );

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete student",
      },
      { status: 500 }
    );
  }
};
