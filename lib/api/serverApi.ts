import { Note } from "@/types/note";
import { cookies } from "next/headers";
import nextServer from "./api";
import { UserLogin } from "@/types/user";
import { CheckSessionRes } from "./clientApi";

export interface FetchNoteService {
  notes: Note[];
  totalPages: number;
}

export async function checkServerSession() {
  const cookieStore = await cookies();

  const res = await nextServer.get<CheckSessionRes>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export const fetchNotesServer = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNoteService> => {
  const cookiesStore = await cookies();

  const params: Record<string, string | number> = { page, perPage };
  if (query) params.search = query;
  if (tag && tag !== `All`) params.tag = tag;

  const res = await nextServer.get<FetchNoteService>(`/notes`, {
    headers: {
      Cookie: cookiesStore.toString(),
    },
    withCredentials: true,
    params,
  });
  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookiesStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return res.data;
};

export const getMeServer = async (): Promise<UserLogin> => {
  const cookiesStore = await cookies();

  const { data } = await nextServer<UserLogin>("/users/me", {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return data;
};
