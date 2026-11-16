import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function PrivacyRedirectPage() {
  redirect(ROUTES.public.privacyPolicy);
}
