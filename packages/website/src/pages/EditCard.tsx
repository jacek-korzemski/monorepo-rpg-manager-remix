import { Box, EditCard, Layout } from '@rpg-manager/components';
import { useParams } from 'react-router-dom';

const EditCardPage = () => {
  const params = useParams();

  if (!params?.id) {
    return (
      <Layout>
        <Box>
          <h1>Brak id karty do odczytu</h1>
          <p>Wygląda na to, że w adresie URL zabrakło id karty do podglądu.</p>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <EditCard id={params.id} apiUrl={import.meta.env.VITE_PUBLIC_API} />
    </Layout>
  );
};

export default EditCardPage;
