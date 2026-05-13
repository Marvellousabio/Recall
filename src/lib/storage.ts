// Browser-compatible mock storage implementation
const UPLOAD_DIR = import.meta.env.VITE_UPLOAD_DIR || 'uploads';

// Mock file storage using localStorage (for demo purposes)
const mockFileStorage: Record<string, { data: string; type: string; name: string }> = {};

// Ensure upload directory exists (mock)
async function ensureUploadDir() {
  // In browser, we don't need to create directories
  return Promise.resolve();
}

// Upload file to browser storage (mock)
export async function uploadFile(file: File, userId: string): Promise<string> {
  await ensureUploadDir();

  // Generate unique filename
  const ext = file.name.split('.').pop() || '';
  const filename = `${userId}_${Date.now()}_${Math.random().toString(36).substring(2)}${ext ? '.' + ext : ''}`;

  // Convert File to base64 for storage
  const buffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  // Store in mock storage
  mockFileStorage[filename] = {
    data: base64,
    type: file.type,
    name: file.name
  };

  // Store in localStorage for persistence
  localStorage.setItem('mock-files', JSON.stringify(mockFileStorage));

  // Return relative URL
  return `/${UPLOAD_DIR}/${filename}`;
}

// Delete file (mock)
export async function deleteFile(filename: string): Promise<void> {
  try {
    delete mockFileStorage[filename];
    localStorage.setItem('mock-files', JSON.stringify(mockFileStorage));
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
}

// Get file URL (mock - returns data URL for browser display)
export function getFileUrl(filename: string): string {
  const file = mockFileStorage[filename];
  if (!file) return '';

  // Return data URL for browser display
  return `data:${file.type};base64,${file.data}`;
}

// Load stored files on module initialization
try {
  const stored = localStorage.getItem('mock-files');
  if (stored) {
    Object.assign(mockFileStorage, JSON.parse(stored));
  }
} catch (error) {
  console.warn('Failed to load mock files from localStorage:', error);
}