import { getInstitutions } from "@/lib/db";
import InstitutionsClient from "./institutions-client";

export default function AdminInstitutionsPage() {
  const institutions = getInstitutions();

  return (
    <InstitutionsClient initialInstitutions={institutions} />
  );
}
