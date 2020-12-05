export interface Item {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
}
export interface RepositoriesData {
  items: Item[];
}
