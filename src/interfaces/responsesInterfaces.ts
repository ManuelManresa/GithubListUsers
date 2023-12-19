import { User } from './user';

export interface FindUsers {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
