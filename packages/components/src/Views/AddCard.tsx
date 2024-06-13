import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Shadowdark from './creators/Shadowdark';
import { Box } from '..';
import BasicFantasy from './creators/BasicFantasy';
import Note from './creators/Note';
import { useCookies } from 'react-cookie';

interface Props {
  data?: {
    name?: string;
    description?: string;
    content?: string;
    user_id?: string;
    id?: string;
  };
  lock?: boolean;
  system?: string;
  apiUrl: string;
  id?: number | string;
}

const AddCard: React.FC<Props> = ({
  data,
  lock,
  system: initialSystem,
  apiUrl,
}) => {
  const [system, setSystem] = useState<string>('none');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [cookies] = useCookies(['70k3n']);

  const btnClass = isLoading ? 'btn loading' : 'btn';

  const postCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setIsLoading(true);

    const form = document.getElementById('add-card-form') as HTMLFormElement;
    const formData = new FormData(form);

    if (lock && data?.user_id) {
      formData.append('user_id', data.user_id);
      formData.append('id', data.id as string);
      formData.append('system', system);
    }

    const apiMethod = lock ? 'putCard' : 'addCard';

    console.log(formData);

    try {
      const response = await fetch(`${apiUrl}/${apiMethod}`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${cookies['70k3n']}`,
        },
      });

      if (response.ok) {
        setIsLoading(false);
        window.location.href = lock ? '/editCardSuccess' : '/addCardSuccess';
      }
    } catch (e) {
      setError('Wystąpił błąd 😟 Spróbuj ponownie później.');
      setIsLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    if (initialSystem) {
      setSystem(initialSystem);
    }
  }, [initialSystem]);

  return (
    <form onSubmit={(e) => postCard(e)} id="add-card-form">
      <Box fullWidth>
        <div className="grid grid-2">
          <div className="grid-item">
            <label htmlFor="name"> Nazwa karty lub postaci </label>
            <input
              name="name"
              id="name"
              type="text"
              defaultValue={data?.name || ''}
            />
          </div>
          <div className="grid-item">
            <label htmlFor="system">
              System
              {lock && (
                <small
                  className="i"
                  data-text="Możliwość zmiany systemu jest niemożliwa, 
                        ze względu na różnorodność pól. 
                        Aby zmienić system, proszę 
                        uwtórz nową kartę postaci."
                >
                  ❔
                </small>
              )}
            </label>
            <select
              name="system"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              disabled={lock}
            >
              <option value="none">None (just a note)</option>
              <option value="bf">Basic Fantasy 3e</option>
              <option value="shd">Shadowdark</option>
            </select>
          </div>
        </div>
        <div className="grid grid-1">
          <div className="grid-item span-3">
            <label htmlFor="description"> Opis karty postaci </label>
            <input
              name="description"
              id="description"
              type="text"
              defaultValue={data?.description || ''}
            />
          </div>
        </div>
      </Box>
      {system === 'shd' && (
        <>
          <h1>Wybrany system: Shadowdark</h1>
          <Box fullWidth>
            <Shadowdark content={data?.content && JSON.parse(data?.content)} />
          </Box>
        </>
      )}
      {system === 'bf' && (
        <>
          <h1>Wybrany system: Basic Fantasy</h1>
          <Box fullWidth>
            <BasicFantasy
              content={data?.content && JSON.parse(data?.content)}
            />
          </Box>
        </>
      )}
      {system === 'none' && (
        <>
          <h1>Zwykła notatka</h1>
          <Box fullWidth>
            <Note content={data?.content && JSON.parse(data?.content)} />
          </Box>
        </>
      )}
      <Spacer />
      {error && <ErrorBox>{error}</ErrorBox>}
      <button type="submit" className={btnClass}>
        Zapisz
      </button>
    </form>
  );
};

export default AddCard;

const Spacer = styled.div`
  margin-bottom: 15px;
`;

const ErrorBox = styled.div`
  color: red;
  font-weight: bold;
`;
