import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Keyboard } from 'lucide-react';

interface KeyboardShortcut {
  key: string;
  description: string;
  modifier?: string;
}

const shortcuts: KeyboardShortcut[] = [
  { key: 'D', description: 'Go to Dashboard', modifier: 'Alt' },
  { key: 'U', description: 'Go to Upload', modifier: 'Alt' },
  { key: 'F', description: 'Go to Flashcards', modifier: 'Alt' },
  { key: 'T', description: 'Go to AI Tutor', modifier: 'Alt' },
  { key: 'E', description: 'Go to Exam Mode', modifier: 'Alt' },
  { key: 'A', description: 'Go to Analytics', modifier: 'Alt' },
  { key: '?', description: 'Show keyboard shortcuts', modifier: 'Shift' },
];

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === '?') {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to navigate quickly through the dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-foreground">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.modifier && (
                  <>
                    <Badge variant="outline" className="font-mono text-xs px-2">
                      {shortcut.modifier}
                    </Badge>
                    <span className="text-muted-foreground">+</span>
                  </>
                )}
                <Badge variant="outline" className="font-mono text-xs px-2">
                  {shortcut.key}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Shift</kbd> +{' '}
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">?</kbd> to toggle this dialog
        </div>
      </DialogContent>
    </Dialog>
  );
}
