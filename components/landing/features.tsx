'use client';
import { Globe, Upload, Settings, Code, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Website Integration',
    description:
      "Train your chatbot on your website's content for instant, accurate responses.",
    icon: Globe,
    stats: '98%',
    statsLabel: 'Accuracy Rate',
    gradient: 'from-pink-500/10 via-purple-500/10 to-blue-500/10',
    iconColor: 'text-pink-500',
  },
  {
    title: 'Document Processing',
    description:
      'Upload PDFs and files to create knowledgeable AI assistants.',
    icon: Upload,
    stats: '50+',
    statsLabel: 'File Formats',
    gradient: 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Advanced Customization',
    description:
      'Set tone, personality, and system prompts to match your brand.',
    icon: Settings,
    stats: '100%',
    statsLabel: 'Customizable',
    gradient: 'from-purple-500/10 via-pink-500/10 to-blue-500/10',
    iconColor: 'text-purple-500',
  },
  {
    title: 'Simple Integration',
    description:
      'Integrate chatbots on your website with just a few lines of code.',
    icon: Code,
    stats: '5min',
    statsLabel: 'Setup Time',
    gradient: 'from-pink-500/10 via-blue-500/10 to-purple-500/10',
    iconColor: 'text-pink-500',
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="bg-background pt-12 pb-24 relative overflow-hidden font-sans"
      id="features"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-30" />
        <div className="absolute inset-0 bg-grid-foreground/5 [mask-image:radial-gradient(background,transparent_70%)]" />
      </div>

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary font-heading">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Everything You Need to Build
            <span className="block text-primary">
              Intelligent Assistants
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your website into an intelligent assistant. Let it handle
            customer queries with precision and speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 rounded-2xl" />
              <div className="relative bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6">
                {/* Icon & Stats */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10"
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-2xl font-bold text-primary font-heading"
                    >
                      {feature.stats}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {feature.statsLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
