import Head from 'next/head';
import Navbar from './navbar/Navbar';
import '../styles/global.scss';

export default ({ children }) => {
  return (
    <>
      <Head>
        <title>Dine!</title>
      </Head>
      <div id="app">
        <Navbar />
        {children}
      </div>
    </>
  );
}



