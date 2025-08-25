"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ProfileForm,
  PasswordForm,
  AccountInfo,
  StorageUsage,
  TwoFactorAuth,
  NotificationPreferences,
  DataExport,
} from "@/components/features/profile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountInfo />
          <StorageUsage />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <PasswordForm />
          <TwoFactorAuth />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <NotificationPreferences />
          <DataExport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
