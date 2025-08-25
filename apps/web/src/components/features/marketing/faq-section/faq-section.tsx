import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import styles from "./faq-section.module.css";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is MeDrive?",
      answer:
        "MeDrive is a self-hosted cloud storage solution that gives you complete control over your data. Unlike traditional cloud services, you host MeDrive on your own servers, ensuring your files never leave your infrastructure.",
    },
    {
      question: "How is MeDrive different from other cloud storage services?",
      answer:
        "The key difference is control and privacy. With MeDrive, you own your data and infrastructure. There are no third-party accesses, no data mining, and no usage tracking. You get enterprise-grade features with complete privacy.",
    },
    {
      question: "Do I need technical expertise to use MeDrive?",
      answer:
        "While self-hosting requires some technical knowledge, we provide detailed documentation and deployment guides. For basic usage, no technical expertise is needed. We also offer managed hosting options for businesses that prefer a hands-off approach.",
    },
    {
      question: "Is MeDrive secure?",
      answer:
        "Yes, security is our top priority. MeDrive uses end-to-end encryption, secure authentication, and follows security best practices. Since you control the infrastructure, you can implement additional security measures as needed.",
    },
    {
      question: "Can I collaborate with others using MeDrive?",
      answer:
        "Absolutely! MeDrive includes robust collaboration features. You can share files and folders, set permissions, and work together with your team in real-time, similar to other cloud storage services.",
    },
    {
      question: "What are the system requirements for self-hosting?",
      answer:
        "MeDrive can run on most modern servers with Docker support. Minimum requirements are 2 CPU cores, 4GB RAM, and 20GB storage (plus storage for your files). We also provide deployment options for cloud platforms like AWS, Azure, and GCP.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about MeDrive and self-hosted
              cloud storage.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl items-start gap-6 py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
