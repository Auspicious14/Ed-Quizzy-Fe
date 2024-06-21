export interface IQuiz {
  _id: string;
  courseId: string;
  name: string;
  description: string;
  timeLimit: string;
  score: number;
  status: 'COMPLETED' | 'DRAFT';
  level: string;
  images: {
    uri: string;
    name: string;
    type: string;
  }[];
}

export interface IQuizPayload {
  status?: 'COMPLETED' | 'DRAFT';
  score?: number;
  courseId?: string;
  courseTitle?: string;
}
