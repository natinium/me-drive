import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Shield, Code, Globe } from "lucide-react";

export const AboutSection = () => {
  const values = [
    {
      icon: <Mountain className="h-8 w-8 text-muted-foreground" />,
      title: "Self-Hosted",
      description:
        "Keep full control of your data by hosting MeDrive on your own servers. No third-party access to your files.",
    },
    {
      icon: <Shield className="h-8 w-8 text-muted-foreground" />,
      title: "Privacy First",
      description:
        "Your files are protected with end-to-end encryption. We never see or store your data.",
    },
    {
      icon: <Code className="h-8 w-8 text-muted-foreground" />,
      title: "Open Source",
      description:
        "Built in the open with a community-driven approach. Audit our code and contribute improvements.",
    },
    {
      icon: <Globe className="h-8 w-8 text-muted-foreground" />,
      title: "Global Access",
      description:
        "Access your files from anywhere in the world with our global CDN and multi-region support.",
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>About Us</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Built for Privacy and Control
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              MeDrive was created to give people and businesses complete control
              over their digital files without compromising on features or
              usability.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground mb-4">
              We believe that your data belongs to you, not to the cloud
              providers. MeDrive empowers individuals and organizations to take
              back control of their digital assets while still enjoying the
              convenience of cloud storage.
            </p>
            <p className="text-muted-foreground">
              By providing a self-hosted solution, we ensure that no third party
              can access your files, analyze your usage patterns, or monetize
              your personal information.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <div className="grid gap-4">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {value.icon}
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
