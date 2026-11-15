
'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Navbar from './Navbar';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HeaderContainer() {
  const pathname = usePathname();

  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (
    !mounted ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard')
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#071326] shadow-sm">
      <TopBar />
      <Navbar />
    </header>
  );
}
