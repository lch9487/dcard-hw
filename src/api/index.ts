import axios, { AxiosPromise } from 'axios';
import { RepositoriesData } from '../types/RepositoriesType';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

export const getRepositories = (
  query: string,
  page: number = 1
): AxiosPromise<RepositoriesData> => {
  return axios.get('https://api.github.com/search/repositories', {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
    params: {
      q: query,
      sort: 'stars',
      per_page: 40,
      page,
    },
  });
};
