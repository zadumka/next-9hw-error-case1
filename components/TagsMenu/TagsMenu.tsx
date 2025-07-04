'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { Tag } from '@/types/note';

const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpenMenu && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/All`} className={css.menuLink}>
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggleMenu}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
