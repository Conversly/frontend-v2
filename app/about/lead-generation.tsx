import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const LeadGeneration = () => {
  return (
    <section id="leadGeneration" className="bg-muted/30 py-24 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-4">Growth Engine</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Turn Website Traffic Into Revenue
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Capture leads 24/7, qualify prospects instantly, and nurture them automatically. Increase conversion rates by 40% while your sales team focuses on closing deals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-2xl">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <Funnel />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-6 h-full">
              <Metric title="Conversion Rate" value="+40%" color="text-green-600 dark:text-green-400" desc="Increased conversion rates through automated lead nurturing" />
              <Metric title="Lead Response Time" value="-80%" color="text-blue-600 dark:text-blue-400" desc="Faster response times to qualify and engage leads" />
              <FeatureList />
              <Analytics />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Funnel = () => (
  <div className="space-y-4 py-4">
    {[
      { label: "Awareness", width: "100%", opacity: "10" },
      { label: "Interest", width: "80%", opacity: "25" },
      { label: "Consideration", width: "60%", opacity: "40" },
      { label: "Action", width: "40%", opacity: "60" },
      { label: "Conversion", width: "30%", opacity: "100" },
    ].map(({ label, width, opacity }, index) => (
      <div key={index} className="mx-auto h-12 bg-primary flex items-center justify-center rounded-lg text-primary-foreground font-medium text-sm transition-all hover:scale-105"
        style={{ width, opacity: parseInt(opacity) / 100 }}>
        <span>{label}</span>
      </div>
    ))}
  </div>
);

interface MetricProps {
  title: string;
  value: string;
  color: string;
  desc: string;
}

const Metric = ({ title, value, color, desc }: MetricProps) => (
  <Card className="border-border/50 shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className={`${color} text-2xl font-bold`}>{value}</span>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </CardContent>
  </Card>
);

const FeatureList = () => (
  <Card className="border-border/50 shadow-sm">
    <CardContent className="p-6">
      <h3 className="font-semibold text-lg mb-4">Automated Features</h3>
      <ul className="space-y-3">
        {["Lead Qualification", "Payment Processing", "Follow-up Sequences"].map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Analytics = () => (
  <Card className="border-border/50 shadow-sm">
    <CardContent className="p-6">
      <h3 className="font-semibold text-lg mb-4">Real-time Analytics</h3>
      <div className="space-y-3">
        {[
          { label: "Lead Quality", value: "85%", color: "text-blue-600 dark:text-blue-400" },
          { label: "Engagement", value: "92%", color: "text-green-600 dark:text-green-400" },
          { label: "Velocity", value: "+65%", color: "text-purple-600 dark:text-purple-400" },
        ].map(({ label, value, color }, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={`font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default LeadGeneration;
