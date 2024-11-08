export interface TimetableCell {
    teacher: string;
    subject: string;
  }
  
  export interface Event {
    _id: string;
    title: string;
    members: string[];
    location: string;
    category: string;
    startDate: string;
    endDate: string;
    time: string;
    organizerName: string;
    sponsors: string[];
    imageUrl: string;
    tags: string[];
    description: string;
    createdAt: string;
  }
  
  export interface Image {
    _id: string;
    filename: string;
    url: string;
    createdAt: string;
  }