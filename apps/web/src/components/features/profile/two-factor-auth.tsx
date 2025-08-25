"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TwoFactorAuth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">2FA Status</p>
            <p className="text-sm text-muted-foreground">
              Protect your account with two-factor authentication
            </p>
          </div>
          <Button variant="outline" size="sm">
            Enable 2FA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
