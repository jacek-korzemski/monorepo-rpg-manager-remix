import { useEffect, useState } from 'react';
import AddCard from './AddCard';
import Spinner from '../Spinner/Spinner';
import Box from '../Box/Box';
import { useCookies } from 'react-cookie';

const EditCard = ({ apiUrl, id }: { apiUrl: string; id: string | number }) => {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any | undefined>(undefined);
  const [system, setSystem] = useState<string | undefined>(undefined);
  const [cookies] = useCookies(['70k3n']);

  async function loadData() {
    await fetch(`${apiUrl}/getCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies['70k3n']}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setData(res);
        setSystem(JSON.parse(res.content).system);
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (isError) {
    return (
      <Box fullWidth>
        <h1>Wystąpił nieokreślony problem</h1>
        <p>Spróbuj ponownie później - może samo przejdzie.</p>
      </Box>
    );
  }

  if (!data) {
    return <Spinner />;
  }

  return <AddCard apiUrl={apiUrl} lock={true} data={data} system={system} />;
};

export default EditCard;
