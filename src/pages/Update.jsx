import { useParams } from 'react-router-dom';
import AgGrid from 'components/AgGrid/AgGrid';

const Update = () => {
  const params = useParams();

  return (
    <>
      <AgGrid />
    </>
  );
};

export default Update;
