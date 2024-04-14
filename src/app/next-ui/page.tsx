import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { SignUpForm } from "../components/signUpForm/SignUpForm";

export default function Page() {

  return (
  
    <div className="max-w-[500px] mx-auto align-middle">
      <div className="align-middle">
      <h2 className="text-center text-xl mb-2">会員登録</h2>
      <Card>
        <CardContent>
          <SignUpForm />

        </CardContent>
      </Card>
</div>
    </div>
  );
}