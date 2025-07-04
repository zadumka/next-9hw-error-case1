import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: `${note.content.slice(0, 30)}...`,
    openGraph: {
      title: note.title,
      description: `${note.content.slice(0, 30)}...`,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${note.title} | NoteHub`,
        },
      ],
    },
  };
}

export default async function NoteDetails() {
  return <NoteDetailsClient />;
}
