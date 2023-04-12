export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: Date;
  lastLogin: Date;
  notes: Note[];
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
};
