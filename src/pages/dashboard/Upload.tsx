import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { prisma } from '@/db/prisma';
import type { StudyMaterial } from '@/types/types';
import { uploadFile, getFileUrl } from '@/lib/storage';
import { Upload as UploadIcon, FileText, Loader2, CheckCircle, XCircle, Eye, ExternalLink } from 'lucide-react';
// Simple toast replacement

export default function Upload() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  useEffect(() => {
    if (user) {
      loadMaterials();
    }
  }, [user]);

  const loadMaterials = async () => {
    if (!user) return;

    const data = await prisma.studyMaterial.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    setMaterials(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 10 * 1024 * 1024) {
      console.error('File size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      // Upload file using local storage
      const fileUrl = await uploadFile(file, user.id);

      // Save to database
      await prisma.studyMaterial.create({
        data: {
          userId: user.id,
          title: file.name,
          fileUrl,
          fileType: file.type,
          status: 'pending'
        }
      });

      console.log('File uploaded successfully!');
      loadMaterials();
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-chart-2" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Upload Study Materials</h1>
          <p className="text-muted-foreground">Upload PDFs, notes, or textbooks to generate AI-powered flashcards.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Material</CardTitle>
            <CardDescription>Supported formats: PDF, DOCX, TXT (Max 10MB)</CardDescription>
          </CardHeader>
          <CardContent>
            <label htmlFor="file-upload" className="block">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                {uploading ? (
                  <div className="space-y-4">
                    <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Uploading...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Study Materials</CardTitle>
            <CardDescription>Manage your uploaded files and generated content</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : materials.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No study materials yet</p>
                <p className="text-sm mt-2">Upload your first file to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {materials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getStatusIcon(material.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{material.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(material.created_at).toLocaleDateString()} • {material.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewMaterial(material)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!previewMaterial} onOpenChange={() => setPreviewMaterial(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-3xl max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-balance">
              <FileText className="h-5 w-5" />
              {previewMaterial?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 font-medium capitalize">{previewMaterial?.status}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 font-medium">{previewMaterial?.file_type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Uploaded:</span>
                <span className="ml-2 font-medium">
                  {previewMaterial?.created_at && new Date(previewMaterial.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">File URL:</p>
              <a
                href={previewMaterial?.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-2 break-all"
              >
                {previewMaterial?.file_url}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </div>

            {previewMaterial?.file_type === 'application/pdf' && (
              <div className="border border-border rounded-lg overflow-hidden">
                <iframe
                  src={previewMaterial.file_url}
                  className="w-full h-[500px]"
                  title="PDF Preview"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPreviewMaterial(null)}>
                Close
              </Button>
              <a href={previewMaterial?.file_url} target="_blank" rel="noopener noreferrer">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
