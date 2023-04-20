import Head from 'next/head';
import BackgroundCircle from '@/components/BackgroundCircle';
import Layout from '@/layout/Layout';
import Hero from '@/components/landingPage/Hero';
import Product from '@/components/landingPage/Product';

const Home = () => {
  return (
    <>
      <Head>
        <title>Notes wmte.io</title>
        <meta
          name="description"
          content="Boost your productivity with our streamlined note-taking solution"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <BackgroundCircle />
        <Hero />
        <Product />
      </Layout>
    </>
  );
};

export default Home;
