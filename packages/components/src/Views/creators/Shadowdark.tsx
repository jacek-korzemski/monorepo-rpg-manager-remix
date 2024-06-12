import React, { useState } from 'react';
import styled from 'styled-components';
import Heart from './img/heart.png';
import Shield from './img/shield.png';
import Circle from './img/circle.png';

interface Content {
  has_spells?: string;
  character_name?: string;
  ancestry?: string;
  class?: string;
  background?: string;
  level?: number;
  hp?: number;
  ac?: number;
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  'ancestry-talent'?: string;
  class_feats?: string;
  gear?: string;
  notes?: string;
  spells?: string;
}

interface Props {
  content?: Content;
}

const AddCardForm: React.FC<Props> = ({ content }) => {
  const [hasSpells, setHasSpells] = useState<boolean>(content?.has_spells === 'on');
  const [str, setStr] = useState<number>(content?.str || 10);
  const [dex, setDex] = useState<number>(content?.dex || 10);
  const [con, setCon] = useState<number>(content?.con || 10);
  const [int, setInt] = useState<number>(content?.int || 10);
  const [wis, setWis] = useState<number>(content?.wis || 10);
  const [cha, setCha] = useState<number>(content?.cha || 10);

  const modCount = (num: number) => Math.floor((num - 10) / 2);

  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max + 1);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  const statRoll = () => getRandomInt(1, 6) + getRandomInt(1, 6) + getRandomInt(1, 6);

  const roll = () => {
    setStr(statRoll());
    setDex(statRoll());
    setCon(statRoll());
    setInt(statRoll());
    setWis(statRoll());
    setCha(statRoll());
  };

  return (
    <div>
      <div className="grid">
        <div className="grid-item">
          <label htmlFor="character_name">Character Name</label>
          <input name="character_name" type="text" defaultValue={content?.character_name || ''} />
        </div>
        <div className="grid-item">
          <label htmlFor="ancestry">Ancestry</label>
          <input name="ancestry" type="text" defaultValue={content?.ancestry || ''} />
        </div>
        <div className="grid-item">
          <label htmlFor="class">Class</label>
          <input name="class" type="text" defaultValue={content?.class || ''} />
        </div>
        <div className="grid-item">
          <label htmlFor="background">Background</label>
          <input name="background" type="text" defaultValue={content?.background || ''} />
        </div>
      </div>
      <div className="grid grid-3">
        <div className="grid-item star-center">
          <label htmlFor="level">Level</label>
          <img src={Circle} alt="circle" />
          <input name="level" type="number" min="0" max="10" defaultValue={content?.level || ''} />
        </div>
        <div className="grid-item heart-center">
          <label htmlFor="hp">Hit Points</label>
          <img src={Heart} alt="heart" />
          <input type="number" name="hp" defaultValue={content?.hp || ''} />
        </div>
        <div className="grid-item shield-center">
          <label htmlFor="ac">Armor Class</label>
          <img src={Shield} alt="shield" />
          <input type="number" name="ac" defaultValue={content?.ac || ''} />
        </div>
      </div>
      <hr />
      <div className="grid grid-6">
        {[
          { label: 'STR', value: str, setValue: setStr },
          { label: 'DEX', value: dex, setValue: setDex },
          { label: 'CON', value: con, setValue: setCon },
          { label: 'INT', value: int, setValue: setInt },
          { label: 'WIS', value: wis, setValue: setWis },
          { label: 'CHA', value: cha, setValue: setCha },
        ].map(({ label, value, setValue }) => (
          <div className="grid-item" key={label}>
            <label htmlFor={label.toLowerCase()}>
              {label} | <span className="mod">{modCount(value)}</span>
            </label>
            <input
              name={label.toLowerCase()}
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
            />
          </div>
        ))}
        <div className="grid-item">
          <button className="btn st"  onClick={(e) => {e.preventDefault(); roll()}}>
            Roll
          </button>
        </div>
      </div>
      <div className="grid grid-1">
        <div className="grid-item">
          <label htmlFor="ancestry-talent">Ancestry talent:</label>
          <input type="text" name="ancestry-talent" defaultValue={content?.['ancestry-talent'] || ''} />
        </div>
      </div>
      <div className="grid grid-1">
        <div className="grid-item">
          <label htmlFor="class_feats">Class Features and talents</label>
          <textarea name="class_feats" defaultValue={content?.class_feats || ''}></textarea>
        </div>
      </div>
      <div className="grid grid-2">
        <div className="grid-item">
          <label htmlFor="gear">Gear</label>
          <textarea name="gear" defaultValue={content?.gear || ''}></textarea>
        </div>
        <div className="grid-item">
          <label htmlFor="notes">Notes</label>
          <textarea name="notes" defaultValue={content?.notes || ''}></textarea>
        </div>
      </div>
      <div className="grid grid-1">
        <div className="grid-item flex-row">
          <input
            type="checkbox"
            name="has_spells"
            checked={hasSpells}
            onChange={(e) => setHasSpells(e.target.checked)}
          />
          <label htmlFor="has_spells">Has spells?</label>
        </div>
        {hasSpells && (
          <div className="grid-item">
            <label htmlFor="spells">Spells list</label>
            <textarea name="spells" defaultValue={content?.spells || ''}></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCardForm;
