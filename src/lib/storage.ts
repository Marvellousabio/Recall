import { idbPut, idbGet, idbDelete } from '@/lib/storage/idb-storage';

const UPLOAD_DIR = import.meta.env.VITE_UPLOAD_DIR || 'uploads';

export async function uploadFile(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop() || '';
  const filename = `${userId}_${Date.now()}_${Math.random().toString(36).substring(2)}${ext ? '.' + ext : ''}`;

  await idbPut(filename, file);
  return `/${UPLOAD_DIR}/${filename}`;
}

export async function deleteFile(filename: string): Promise<void> {
  const name = filename.replace(/^.*[\\/]/, '');
  await idbDelete(name);
}

export function getFileUrl(filename: string): string {
  const name = filename.replace(/^.*[\\/]/, '');
  const blobUrl = (window as any).__recallFileBlobUrls?.get(name);
  if (blobUrl) return blobUrl;

  return `/${UPLOAD_DIR}/${name}`;
}

export async function getFileBlobUrl(filename: string): Promise<string> {
  const name = filename.replace(/^.*[\\/]/, '');
  const existing = (window as any).__recallFileBlobUrls?.get(name);
  if (existing) return existing;

  const blob = await idbGet(name);
  if (!blob) return '';

  const url = URL.createObjectURL(blob);
  let store = (window as any).__recallFileBlobUrls;
  if (!store) {
    store = new Map();
    (window as any).__recallFileBlobUrls = store;
  }
  store.set(name, url);
  return url;
}

export async function ensureFileBlobUrl(filename: string): Promise<string> {
  const url = await getFileBlobUrl(filename);
  if (url) return url;
  return `/${UPLOAD_DIR}/${filename.replace(/^.*[\\/]/, '')}`;
}
