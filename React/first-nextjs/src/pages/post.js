// import { withRouter } from 'next/router'

const Post = ({data, id}) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <h2>{id}</h2>
    </div>
  );
};

Post.getInitialProps = async ({ query }) => {
    const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`)).json()
    return {
        ...query, data
    }
};

export default Post;
