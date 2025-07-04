'use client';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import css from './EditProfile.module.css';
import { checkSession, getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfileClient() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }
    setNewUsername(user.username);
    const fetchUser = async () => {
      try {
        await checkSession();
        const fetchedUser = await getMe();
        if (fetchedUser) {
          setUser(fetchedUser);
          setNewUsername(fetchedUser.username || '');
        }
      } catch {}
    };
    fetchUser();
  }, [user, setUser]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateMe({ username: newUsername });
      if (user) {
        setUser({ ...user, username: newUsername });
      }
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form onSubmit={handleSave} className={css.profileInfo}>
          <p>Email: {user.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
