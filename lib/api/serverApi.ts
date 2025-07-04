import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { nextServer } from './api';

export const getMe = async (): Promise<User | null> => {
  const { data } = await nextServer.get('/users/me');
  return data;
};

export interface FetchNotesProps {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const data = await nextServer.get('/auth/session');
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get(`/notes/${id}`);
  return data;
};
