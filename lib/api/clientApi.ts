import { NewNoteContent, Note } from '@/types/note';
import { User } from '@/types/user';
import axios from 'axios';
import { FetchNotesProps, FetchNotesResponse } from './serverApi';

export type AuthRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const login = async (data: AuthRequest) => {
  const res = await axios.post<User>('/auth/login', data);
  return res.data;
};

export const register = async (data: AuthRequest) => {
  const res = await axios.post<User>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/auth/logout');
};

export const checkSession = async () => {
  await axios.get('/auth/session');

export const getMe = async (): Promise<User> => {
  const res = await axios.get('/users/me');
  return res.data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await axios.patch('/users/me', data);
  return res.data;
};

export const createNote = async (newNote: NewNoteContent) => {
  const response = await axios.post<Note>('/notes', newNote);
  return response.data;
};
