import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RecentFilesTable from "./recent-files-table";

const mockFiles = [
  {
    id: "1",
    name: "Annual-Report.pdf",
    mimeType: "application/pdf",
    size: 1572864,
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "2",
    name: "Company-Headshots.zip",
    mimeType: "application/zip",
    size: 26214400,
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
  },
  {
    id: "3",
    name: "Product-Demo.mp4",
    mimeType: "video/mp4",
    size: 134217728,
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(), // 2 weeks ago
  },
];

export default {
  title: "Components/Features/Dashboard/RecentFilesTable",
  component: RecentFilesTable,
} as ComponentMeta<typeof RecentFilesTable>;

const Template: ComponentStory<typeof RecentFilesTable> = (args) => (
  <RecentFilesTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  files: mockFiles,
};

export const Empty = Template.bind({});
Empty.args = {
  files: [],
  title: "No Files Here",
  description: "There are no files to display at the moment.",
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  files: mockFiles.slice(0, 1),
  title: "Important Documents",
  description: "Just the most important stuff.",
};
