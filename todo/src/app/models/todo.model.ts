export interface Todo {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  modifiedAt?: string;
  dueUntil?: string;
  done: boolean;
  imageUrl: string;
}
