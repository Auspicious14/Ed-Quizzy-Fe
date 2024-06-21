export interface IQuestion {
  _id: string;
  courseId: string;
  quizId: string;
  question: string;
  answer: string;
  options: string[];
  allAnswers?: any[];
  course: {
    _id: string;
    title: string;
    level: string;
  };
}

export interface IQuestionInput {
  quizId?: string;
}
