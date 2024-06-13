import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Shadowdark from './creators/Shadowdark';
import { Box } from '..';
import BasicFantasy from './creators/BasicFantasy';
import Note from './creators/Note';
import { useCards } from '@rpg-manager/hooks';

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
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | undefined>(undefined);
  const { postCard, editCard } = useCards(apiUrl);

  const btnClass = isLoading ? 'btn loading' : 'btn';

  useEffect(() => {
    console.log(lock);
    if (initialSystem) {
      setSystem(initialSystem);
    }
  }, [initialSystem]);

  const handleSubmit = (e: React.FormEvent) => {
    if (lock) {
      editCard(e, data, system);
      return;
    }
    postCard(e);
    return;
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      id={lock ? 'edit-card-form' : 'add-card-form'}
    >
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
