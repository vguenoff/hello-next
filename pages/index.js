import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const PostLink = ({ title, id }) => (
  <li>
    <Link href={`/post?title=${title}`} as={`p/${id}`} >
      <a>{title}</a>
    </Link>
  </li>
);

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link href={`/post/post?id=${show.id}`} as={`/p/${show.id}`} >
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data,
  }
}

export default Index;
