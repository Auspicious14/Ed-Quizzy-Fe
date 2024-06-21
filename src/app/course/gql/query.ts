import { gql } from '@apollo/client/core';
import { CourseFragment } from './fragment';

export const COURSE_PAGE = gql`
  query getCourses {
    getCourses {
      ...Course
    }
  }
  ${CourseFragment}
`;

export const GET_COURSES_BY_LEVEL = gql`
  query getCoursesByLevel($levelId: String!) {
    getCoursesByLevel(levelId: $levelId) {
      ...Course
    }
  }
  ${CourseFragment}
`;

export const GET_COURSE_BY_ID = gql`
  query getCourseById($id: String!) {
    getCourseById(id: $id) {
      ...Course
    }
  }
  ${CourseFragment}
`;
