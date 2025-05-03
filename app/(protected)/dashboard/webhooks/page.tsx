'use client'
import { DashboardHeader } from "@/components/dashboard/header";
import Form from "./form";
import WebhookList from "./webhook-list";
export default function Page() {

  return (
    <>
      <DashboardHeader
        heading="Webhooks"
        text="Create and manage webhooks"
      />
      <div className="w-full justify-center max-w-2xl mx-auto">
        <Form />
        <WebhookList />
      </div>
    </>
  );
}
