import { AppState } from './../../../app.state';
import { CourseState } from '../reducers/course.reducer';

export const selectActiveCourse = (state: AppState): CourseState => state.course;
