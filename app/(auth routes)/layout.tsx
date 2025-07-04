'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ❌ Помилка: відсутній виклик router.refresh()
    console.log('Component mounted');
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}
