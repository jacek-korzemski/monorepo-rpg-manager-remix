import { useCards, useUser } from '@rpg-manager/hooks';
import { Link } from 'react-router-dom';
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

const DeleteButton = styled.button`
  display: inline;
  padding: 0;
  margin: 0;
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid white;
  }
`;

const CardsComponent = ({ apiUrl }: { apiUrl: string }) => {
  const { token } = useUser();
  const [isMount, setIsMount] = useState(false);
  const [cardsArray, setCardsArray] = useState<Card[]>([]);
  const { deleteCard } = useCards(apiUrl);

  const loadData = async () => {
    setIsMount(false);
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

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const isDeleted = await deleteCard(id);
      if (isDeleted) {
        await loadData();
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!isMount) {
    return <Spinner />;
  }

  if (cardsArray.length === 0) {
    return (
      <Box fullWidth>
        <h1>Miejsce na Twoje karty</h1>
        <p>
          Wygląda na to, że nie masz jeszcze żadnej karty. Śmiało, utwórz swoją
          pierwszą kartę <Link to="/addCard">tutaj</Link>!
        </p>
      </Box>
    );
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
                <Link to={`/editCard/${card.id}`}>📝</Link> |{' '}
                <DeleteButton onClick={() => handleDelete(card.id)}>
                  ❌
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default CardsComponent;
