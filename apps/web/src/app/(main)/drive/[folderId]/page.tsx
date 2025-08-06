"use client";

import React from "react";
import MyDrivePage from "../page";

export default function FolderPage({
  params,
}: {
  params: { folderId: string };
}) {
  return <MyDrivePage folderId={params.folderId} />;
}
