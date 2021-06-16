import { AppState } from '../../../../app.state';

export const selectCoursesList = (state) => state.admin.courses.list;
export const selectCoursesLoading = (state) => state.admin.courses.loading;
