import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchedShortcut = shortcuts.find(
        (shortcut) =>
          shortcut.key.toLowerCase() === event.key.toLowerCase() &&
          !!shortcut.ctrlKey === (event.ctrlKey || event.metaKey) &&
          !!shortcut.shiftKey === event.shiftKey &&
          !!shortcut.altKey === event.altKey
      );

      if (matchedShortcut) {
        event.preventDefault();
        matchedShortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export function useDashboardShortcuts() {
  const navigate = useNavigate();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'd',
      altKey: true,
      action: () => navigate('/dashboard'),
      description: 'Go to Dashboard',
    },
    {
      key: 'u',
      altKey: true,
      action: () => navigate('/dashboard/upload'),
      description: 'Go to Upload',
    },
    {
      key: 'f',
      altKey: true,
      action: () => navigate('/dashboard/flashcards'),
      description: 'Go to Flashcards',
    },
    {
      key: 't',
      altKey: true,
      action: () => navigate('/dashboard/tutor'),
      description: 'Go to AI Tutor',
    },
    {
      key: 'e',
      altKey: true,
      action: () => navigate('/dashboard/exam'),
      description: 'Go to Exam Mode',
    },
    {
      key: 'a',
      altKey: true,
      action: () => navigate('/dashboard/analytics'),
      description: 'Go to Analytics',
    },
  ];

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}
