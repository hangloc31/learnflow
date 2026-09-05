import { handleLeadRoute } from "@/lib/leads/server";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleLeadRoute(request);
}
