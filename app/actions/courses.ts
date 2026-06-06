'use server';

import { addCourse as addCourseToDb, Course } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addCourse(formData: FormData) {
  const title = formData.get('title') as string;
  const instructor = formData.get('instructor') as string;
  const category = formData.get('category') as string;
  const level = formData.get('level') as 'beginner' | 'intermediate' | 'advanced';
  const price = Number(formData.get('price'));

  const courseId = 'crs-' + Date.now();

  const newCourse: Course = {
    id: courseId,
    title,
    instructorName: instructor,
    instructorId: 'fac-' + Date.now(), // dummy id
    description: '',
    category,
    price,
    duration: '0h',
    level,
    tags: [],
    status: 'draft',
    totalLectures: 0,
    enrolled: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  addCourseToDb(newCourse);
  revalidatePath('/admin/courses');
}
