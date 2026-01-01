'use client';
import { User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const features = [
  {
    title: 'Take actions on your systems',
    description:
      "Configure actions that your agent can perform within your systems or through one of our integrations, like updating a customer's subscription or changing their address.",
    image:
      '/take_action.png',
    isLarge: true,
  },
  {
    title: 'Compare AI models',
    description:
      'Experiment with various models and configurations to make sure you have the best setup for your use case.',
    image:
      '/compare_model.png',
    isLarge: false,
  },
  {
    title: 'Smart escalation',
    description:
      'Give your agent instructions in natural language on when to escalate queries to a human agents.',
    image:
      '/escalation.png',
    isLarge: false,
  },
  {
    title: 'Advanced reporting',
    description:
      'Gain insights and optimize agent performance with detailed analytics.',
    image:
      '/reporting.png',
    isLarge: true,
  },
];



export default function FeaturesSection() {
  return (
    <div className="w-full py-24 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">

            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-normal text-left">
                Build the perfect customer-facing AI agent
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                VerlyAI gives you all the tools you need to train your perfect AI agent and connect it to your systems.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-md h-full p-6 aspect-square lg:aspect-auto flex justify-between flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer overflow-hidden ${feature.isLarge ? 'lg:col-span-2' : ''
                  }`}
              >
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
