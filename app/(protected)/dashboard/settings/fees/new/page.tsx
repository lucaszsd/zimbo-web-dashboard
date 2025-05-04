import { DashboardHeader } from "@/components/dashboard/header";
import Form from "./form";

export default function NewFee() {
  return (
    <>
        <DashboardHeader
            heading="New Fee"
            text="Create a new fee"
        />
        <div className="w-full max-w-2xl mx-auto">
            <Form/>
        </div>
    </>
  )
}
