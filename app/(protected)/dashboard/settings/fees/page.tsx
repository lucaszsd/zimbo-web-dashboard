import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import FeesList from "./fees-list";
import Form from "./new/form";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Fees"
        text="Manage payin and payout fees"
        
      >
        <Button>
          New Fee
        </Button>
      </DashboardHeader>
      <div className="grid gap-8 max-w-xl mx-auto">
 
        <Form />
        <div>
          <p className="font-semibold">Active fees:</p>
        </div>
        <FeesList />
      </div>
    </>
  );
}
