import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, HardDrive, Users, Zap } from "lucide-react";
import Link from "next/link";
import styles from "./pricing-section.module.css";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "5 GB storage",
        "1 user",
        "Basic file sharing",
        "Community support",
      ],
      icon: <HardDrive className="h-8 w-8 text-muted-foreground" />,
      cta: "Get Started",
      ctaLink: "/signup",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For professionals and small teams",
      features: [
        "500 GB storage",
        "5 users",
        "Advanced sharing",
        "Priority support",
        "File versioning",
      ],
      icon: <Zap className="h-8 w-8 text-muted-foreground" />,
      cta: "Start Free Trial",
      ctaLink: "/signup",
      popular: true,
    },
    {
      name: "Business",
      price: "$29",
      period: "per month",
      description: "For growing businesses",
      features: [
        "5 TB storage",
        "Unlimited users",
        "Advanced permissions",
        "24/7 priority support",
        "Audit logs",
        "SSO integration",
      ],
      icon: <Users className="h-8 w-8 text-muted-foreground" />,
      cta: "Contact Sales",
      ctaLink: "#contact",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>Plans</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that works best for you and your team. All plans
              include a 14-day free trial.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "relative border-primary" : ""}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="flex flex-col items-center justify-center gap-2 pt-8">
                {plan.icon}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-center">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    /{plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.ctaLink}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Need a custom plan?{" "}
            <Link href="#contact" className="text-primary hover:underline">
              Contact our sales team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
