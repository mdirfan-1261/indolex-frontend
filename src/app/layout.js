import './globals.css';
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
            <HeaderContainer />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}