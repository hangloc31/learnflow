import { NextResponse } from "next/server";
import { getDb } from "@/lib/leads/db";

export async function GET() {
  try {
    const db = await getDb();

    // Test 1: list all (no params)
    const teachers = await db.all("SELECT * FROM teachers ORDER BY rowid");

    // Test 2: get with params
    const single = await db.get("SELECT * FROM teachers WHERE slug = ?", ["placeholder-nguyen-thi-mai"]);

    // Test 3: programs
    const programs = await db.all("SELECT * FROM programs ORDER BY rowid");
    const singleProgram = await db.get("SELECT * FROM programs WHERE slug = ?", ["preschool"]);

    return NextResponse.json({
      teachersCount: teachers.length,
      singleTeacher: single ? { slug: single.slug, name: single.name } : null,
      programsCount: programs.length,
      singleProgram: singleProgram ? { slug: singleProgram.slug, name: singleProgram.name } : null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    return NextResponse.json({ error: message, stack }, { status: 500 });
  }
}
