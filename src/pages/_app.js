// pages/_app.js
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from '../redux/store'; // Import your Redux store

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  );
}
