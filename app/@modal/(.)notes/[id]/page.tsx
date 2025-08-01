import NotePreviewClient from './NotePreview.client';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NoteDetailsProps) {
  const { id } = params;
  return <NotePreviewClient id={id} />;
}
