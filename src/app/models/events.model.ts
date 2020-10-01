export interface Event {
  eventName: string;
  eventDate: {
    seconds: number;
    nanoseconds: number;
    getMonth: () => number;
    getFullYear: () => number;
  };
  eventParticipants: string;
  eventLocation: string;
  eventGallery: string[];
  semesterId: string;
  userCreatorId: string;
  id: string;
}
