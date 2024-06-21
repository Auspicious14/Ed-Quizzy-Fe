export interface ICourse {
  _id: string;
  title: string;
  code: string;
  level: string;
  levelId: string;
  description: string;
  images: {
    uri: string;
    name: string;
    type: string;
  }[];
}
