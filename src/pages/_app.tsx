import type { AppProps } from 'next/app';
import Theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import '@/styles/globalstyle.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
