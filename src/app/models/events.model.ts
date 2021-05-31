export interface Event {
  name: string;
  date: {
    seconds: number;
    nanoseconds: number;
    getMonth: () => number;
    getFullYear: () => number;
  };
  participants: string;
  location: string;
  gallery: string[];
  semester_id: string;
  user_creator_id: string;
  id: string;
}
