import { useUser } from '@rpg-manager/hooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Spinner } from '..';

interface Card {
  id: number;
  name: string;
  description: string;
}

const Table = styled.table`
  width: calc(100% - 5px);
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
  border-right: 1px solid #ccc;
  padding: 8px;

  &:first-child {
    border-left: 1px solid #ccc;
  }
`;

const TableHeader = styled(TableRow)`
  background-color: darkblue;
  font-weight: bold;
  border-top: 1px solid #ccc;
`;

const Link = styled.a`
  &:hover {
    border-bottom: transparent;
  }
`;

const CardsComponent = ({ apiUrl }: { apiUrl: string }) => {
  const { token } = useUser();
  const [isMount, setIsMount] = useState(false);
  const [cardsArray, setCardsArray] = useState<Card[]>([]);

  const loadData = async () => {
    try {
      const response = await fetch(apiUrl + '/allCards', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Card[] = await response.json();
        const sortedData = data.sort((a, b) => b.id - a.id);
        setCardsArray(sortedData);
        setIsMount(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!isMount) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1>Moje karty</h1>
      <Table>
        <thead>
          <TableHeader>
            <TableCell>Lp.</TableCell>
            <TableCell>Nazwa karty</TableCell>
            <TableCell>Opis</TableCell>
            <TableCell>Akcje</TableCell>
          </TableHeader>
        </thead>
        <tbody>
          {cardsArray.map((card, index) => (
            <TableRow key={card.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{card.name}</TableCell>
              <TableCell>{card.description}</TableCell>
              <TableCell>
                <Link href={`/editCard/#${card.id}`}>📝</Link>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default CardsComponent;
