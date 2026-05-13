import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { prisma } from '@/db/prisma';
import type { Flashcard } from '@/types/types';
import { RotateCcw, CheckCircle } from 'lucide-react';
// Simple toast replacement

export default function Flashcards() {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFlashcards();
    }
  }, [user]);

  const loadFlashcards = async () => {
    if (!user) return;

    const data = await prisma.flashcard.findMany({
      where: {
        userId: user.id,
        nextReview: {
          lte: new Date()
        }
      },
      orderBy: {
        nextReview: 'asc'
      }
    });

    setFlashcards(data);
    setLoading(false);
  };

  const handleRating = async (rating: number) => {
    const card = flashcards[currentIndex];
    if (!card) return;

    const { interval_days, ease_factor } = calculateSM2(card, rating);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval_days);

    await prisma.flashcard.update({
      where: { id: card.id },
      data: {
        intervalDays: interval_days,
        easeFactor: ease_factor,
        nextReview
      }
    });

    await prisma.reviewSession.create({
      data: {
        userId: user.id,
        flashcardId: card.id,
        rating
      }
    });

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      console.log('Review session complete!');
      loadFlashcards();
      setCurrentIndex(0);
      setFlipped(false);
    }
  };

  const calculateSM2 = (card: Flashcard, rating: number) => {
    let { interval_days, ease_factor } = card;

    if (rating >= 3) {
      if (interval_days === 1) {
        interval_days = 6;
      } else {
        interval_days = Math.round(interval_days * ease_factor);
      }
      ease_factor = ease_factor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    } else {
      interval_days = 1;
    }

    ease_factor = Math.max(1.3, ease_factor);

    return { interval_days, ease_factor };
  };

  const currentCard = flashcards[currentIndex];

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Flashcard Review</h1>
            <p className="text-muted-foreground">
              {flashcards.length > 0 ? `${currentIndex + 1} of ${flashcards.length} cards` : 'No cards due for review'}
            </p>
          </div>
          {flashcards.length > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold font-metric">{flashcards.length - currentIndex}</div>
              <div className="text-sm text-muted-foreground">remaining</div>
            </div>
          )}
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-12">
              <div className="h-64 bg-muted animate-pulse rounded-lg" />
            </CardContent>
          </Card>
        ) : flashcards.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-chart-2" />
              <h2 className="text-2xl font-heading font-bold mb-2">All caught up!</h2>
              <p className="text-muted-foreground">No flashcards due for review right now.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card
              className="cursor-pointer transition-all hover:shadow-lg"
              onClick={() => setFlipped(!flipped)}
            >
              <CardContent className="p-12">
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                  {!flipped ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">Question</p>
                      <h2 className="text-2xl font-heading font-semibold">{currentCard?.question}</h2>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">Answer</p>
                      <p className="text-xl">{currentCard?.answer}</p>
                    </div>
                  )}
                </div>
                {!flipped && (
                  <div className="text-center mt-8">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Click card to reveal answer
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {flipped && (
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleRating(1)}
                  className="h-20 flex flex-col gap-2"
                >
                  <span className="text-lg font-semibold">Hard</span>
                  <span className="text-xs text-muted-foreground">Review soon</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleRating(3)}
                  className="h-20 flex flex-col gap-2"
                >
                  <span className="text-lg font-semibold">Good</span>
                  <span className="text-xs text-muted-foreground">Normal interval</span>
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleRating(5)}
                  className="h-20 flex flex-col gap-2"
                >
                  <span className="text-lg font-semibold">Easy</span>
                  <span className="text-xs text-muted-foreground">Longer interval</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
