export interface IProfile {
  firstName: string;
  lastName: string;
  imageUrl: string;
  phoneNumber: string;
  state: string;
  city: string;
  dateOfBirth: Date;
  street: string;
  createdAt: Date;
  preferences: {
    preferenceType: string;
    preferenceValue: string;
  }[];
  email:string;
  userName:string;
}