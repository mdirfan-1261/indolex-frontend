import './globals.css';
import { Suspense } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import HeaderContainer from '@/components/landing/HeaderContainer';

export const metadata = {
  title: 'IndoLex Laws | Legal & Corporate Loan Default Management Platform',
  description:
    'Integrated Enterprise Legal Case Management, CRM and Corporate Bank Loan Default Management Platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-[#071326] dark:text-slate-100">
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<div className="h-14 sm:h-16 border-b border-slate-200 dark:border-slate-800" />}>
              <HeaderContainer />
            </Suspense>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
