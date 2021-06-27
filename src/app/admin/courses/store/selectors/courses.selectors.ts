import { Course } from './../../../../models/course.model';
import { User } from './../../../../models/user.model';

export const selectCoursesList = (state): Course[] => state.admin.courses.list;
export const selectCoursesLoading = (state) => state.admin.courses.loading;
export const selectCourseUsersList = (state): User[] => state.admin.courses.users;
