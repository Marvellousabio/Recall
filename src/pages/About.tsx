import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, Users, Zap } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Brain,
      title: 'Science-Backed',
      description: 'Built on proven cognitive science principles and neuroscience research.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Focused on measurable learning outcomes and long-term retention.'
    },
    {
      icon: Users,
      title: 'Human-Centered',
      description: 'Designed with empathy for learners and their unique challenges.'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Leveraging cutting-edge AI to personalize and optimize learning.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-balance">
            About Project Recall
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-xl text-foreground">
              Project Recall is an AI-powered cognitive mastery platform that transforms how people learn and retain information.
            </p>

            <p>
              We believe that traditional learning methods are broken. Students spend countless hours studying, only to forget most of what they learned within weeks. This isn't a failure of the learner—it's a failure of the system.
            </p>

            <p>
              Our platform combines proven cognitive science principles like Active Recall and Spaced Repetition with cutting-edge AI technology to create a learning experience that actually works. By transforming your study materials into intelligent, adaptive learning systems, we help you master content faster and retain it longer.
            </p>

            <h2 className="text-2xl font-heading font-bold mt-12 mb-6 text-foreground">Our Mission</h2>
            <p>
              To democratize access to world-class learning technology and help every learner achieve their full cognitive potential.
            </p>

            <h2 className="text-2xl font-heading font-bold mt-12 mb-6 text-foreground">The Science Behind Project Recall</h2>
            <p>
              Our platform is built on decades of cognitive science research, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Active Recall:</strong> Retrieving information from memory strengthens neural pathways and improves long-term retention.</li>
              <li><strong>Spaced Repetition:</strong> Reviewing material at optimal intervals maximizes retention while minimizing study time.</li>
              <li><strong>The Testing Effect:</strong> Regular self-testing is more effective than passive review for long-term learning.</li>
              <li><strong>Elaborative Interrogation:</strong> Asking "why" and "how" questions deepens understanding and retention.</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
