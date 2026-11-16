import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function TermsRedirectPage() {
  redirect(ROUTES.public.termsAndConditions);
}
