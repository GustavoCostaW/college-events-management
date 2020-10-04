import { FirebaseDoc } from './../shared/firebase/models/firebase-doc';

export interface Event extends FirebaseDoc {
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
