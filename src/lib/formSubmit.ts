export const WEBSITE_FORM_WEBHOOK =
  "https://n8n.srv1535368.hstgr.cloud/webhook/witec/website-form-5f8k2q";

/**
 * POST a website form submission (contact / careers) to the n8n webhook
 * "WITEC - Website Form to Email", which emails it to info@witecglobal.com.
 * Returns true only on an HTTP 200 response.
 */
export async function submitWebsiteForm(
  payload: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch(WEBSITE_FORM_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Read a File as a bare base64 string (no data: URL prefix). */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
