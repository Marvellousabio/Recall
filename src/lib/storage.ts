import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = import.meta.env.VITE_UPLOAD_DIR || 'uploads';

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Upload file to local filesystem
export async function uploadFile(file: File, userId: string): Promise<string> {
  await ensureUploadDir();

  // Generate unique filename
  const ext = path.extname(file.name);
  const filename = `${userId}_${Date.now()}_${Math.random().toString(36).substring(2)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  // Convert File to buffer and write
  const buffer = await file.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(buffer));

  // Return relative URL (in production, this would be a CDN URL)
  return `/${UPLOAD_DIR}/${filename}`;
}

// Delete file
export async function deleteFile(filename: string): Promise<void> {
  const filepath = path.join(UPLOAD_DIR, filename);
  try {
    await fs.unlink(filepath);
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
}

// Get file URL (for serving)
export function getFileUrl(filename: string): string {
  return `/${UPLOAD_DIR}/${filename}`;
}