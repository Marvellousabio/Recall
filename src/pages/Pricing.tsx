import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Project Recall',
      features: [
        '5 study materials per month',
        '50 AI-generated flashcards',
        'Basic spaced repetition',
        'Community support',
        'Mobile app access'
      ],
      cta: 'Get Started',
      href: '/signup',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For serious learners and students',
      features: [
        'Unlimited study materials',
        'Unlimited AI flashcards',
        'Advanced SM-2 algorithm',
        'CBT exam mode',
        'AI tutor access',
        'Retention analytics',
        'Priority support',
        'Export capabilities'
      ],
      cta: 'Start Free Trial',
      href: '/signup',
      popular: true
    },
    {
      name: 'Team',
      price: '$99',
      period: 'per month',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Shared study libraries',
        'Team analytics',
        'Admin dashboard',
        'Custom branding',
        'Dedicated support',
        'SSO integration'
      ],
      cta: 'Contact Sales',
      href: '/contact',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Choose the plan that fits your learning goals. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold font-metric">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.href} className="w-full">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
