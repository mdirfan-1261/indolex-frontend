
'use client';

import { useSyncExternalStore } from 'react';

const AUTH_EVENT = 'indolex-auth-change';
const THEME_EVENT = 'indolex-theme-change';

function subscribeToAuth(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener(AUTH_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getAuthSnapshot() {
  if (typeof window === 'undefined') return null;

  const token =
    localStorage.getItem('indolex_token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('token');

  const user = localStorage.getItem('indolex_user');

  if (!token) return '';

  return JSON.stringify({ token, user });
}

function getAuthServerSnapshot() {
  return null;
}

export function useBrowserSession() {
  const snapshot = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  let session = null;

  if (snapshot) {
    try {
      session = JSON.parse(snapshot);
    } catch {
      session = null;
    }
  }

  return {
    token: session?.token || null,
    user: session?.user ? safeParseUser(session.user) : null,
    loading: snapshot === null,
    isAuthenticated: Boolean(session?.token),
  };
}

function safeParseUser(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
}

function subscribeToTheme(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getThemeSnapshot() {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('theme') || 'dark';
}

function getThemeServerSnapshot() {
  return 'dark';
}

export function useBrowserTheme() {
  return useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );
}

export function notifyThemeChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(THEME_EVENT));
  }
}
