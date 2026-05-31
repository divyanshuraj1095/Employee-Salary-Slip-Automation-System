import Activity from "../models/activity";

type ActivityType = "upload" | "generate" | "email";

export async function logActivity(
  type: ActivityType,
  title: string,
  detail: string,
  meta: Record<string, unknown> = {},
) {
  await Activity.create({ type, title, detail, meta });
}
