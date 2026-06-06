'use server';

import { addInstitution as addInstitutionToDb, Institution } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addInstitution(formData: FormData) {
  const name = formData.get('name') as string;
  const campus = formData.get('campus') as string;
  const departments = Number(formData.get('departments'));
  const students = Number(formData.get('students'));
  const tier = formData.get('tier') as 'standard' | 'enterprise';

  const institutionId = 'inst-' + Date.now();

  const newInstitution: Institution = {
    id: institutionId,
    name,
    campus,
    departments,
    students,
    tier,
    renewal: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next year
    status: 'active',
    createdAt: new Date().toISOString()
  };

  addInstitutionToDb(newInstitution);
  revalidatePath('/admin/institutions');
}
