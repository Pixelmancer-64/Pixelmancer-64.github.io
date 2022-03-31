import Link from "next/Link";

const Index = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map((e) => (
          <li key={e.id}>
            <Link href={`/post?id=${e.id}`} as={`/post/${e.id}`}>
              <a>{e.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Index.getInitialProps = async () => {
  const data = await (
    await fetch("https://jsonplaceholder.typicode.com/posts")
  ).json();
  return {
    data,
  };
};
export default Index;
