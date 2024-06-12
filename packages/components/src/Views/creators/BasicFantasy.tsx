import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heart from './img/heart.png';
import Shield from './img/shield.png';
import Circle from './img/circle.png';

interface Content {
  has_spells?: string;
  character_name?: string;
  race?: string;
  class?: string;
  xp?: number;
  hp?: number;
  ac?: number;
  attack?: number;
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  st_death?: number;
  st_wands?: number;
  st_para?: number;
  st_dragonb?: number;
  st_spells?: number;
  gear?: string;
  notes?: string;
  spells?: string;
}

interface Props {
  content?: Content;
}

const CharacterForm: React.FC<Props> = ({ content }) => {
  const [hasSpells, setHasSpells] = useState<boolean>(false);
  const [str, setStr] = useState<number>(content?.str || 10);
  const [dex, setDex] = useState<number>(content?.dex || 10);
  const [con, setCon] = useState<number>(content?.con || 10);
  const [int, setInt] = useState<number>(content?.int || 10);
  const [wis, setWis] = useState<number>(content?.wis || 10);
  const [cha, setCha] = useState<number>(content?.cha || 10);

  useEffect(() => {
    if (content) {
      setHasSpells(content.has_spells === 'on');
    }
  }, [content]);

  const modCount = (num: number) => {
    if (num <= 3) return -3;
    else if (num <= 5) return -2;
    else if (num <= 8) return -1;
    else if (num <= 12) return 0;
    else if (num <= 15) return 1;
    else if (num <= 17) return 2;
    else return 3;
  };

  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max + 1);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  const statRoll = () => {
    let dice = [getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6)];
    return dice.reduce((acc, curr) => acc + curr, 0);
  };

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
      <div className="grid grid-4">
        <div className="grid-item">
          <label htmlFor="character_name">Character Name</label>
          <input name="character_name" type="text" defaultValue={content?.character_name || ''} />
        </div>
        <div className="grid-item">
          <label htmlFor="race">Race</label>
          <input name="race" type="text" defaultValue={content?.race || ''} />
        </div>
        <div className="grid-item">
          <label htmlFor="class">Class</label>
          <input name="class" type="text" defaultValue={content?.class || ''} />
        </div>
        <div className="grid-item">
          <label htmlFor="xp">XP</label>
          <input name="xp" type="number" defaultValue={content?.xp || 0} />
        </div>
      </div>
      <div className="grid grid-3">
        <div className="grid-item heart-center">
          <label htmlFor="hp">Hit Points</label>
          <img src={Heart} alt="heart" />
          <input type="number" name="hp" defaultValue={content?.hp || 1} />
        </div>
        <div className="grid-item shield-center">
          <label htmlFor="ac">Armor Class</label>
          <img src={Shield} alt="shield" />
          <input type="number" name="ac" defaultValue={content?.ac || 10} />
        </div>
        <div className="grid-item star-center">
          <label htmlFor="attack">
            <b>Attack</b> Bonus
          </label>
          <img src={Circle} alt="circle" />
          <input name="attack" type="number" defaultValue={content?.attack || 0} />
        </div>
      </div>
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
          <button className="btn st" onClick={(e) => {e.preventDefault(); roll()}}>
            Roll
          </button>
        </div>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Saving Throws</h2>
      <div className="grid grid-5">
        {[
          { label: 'Death | Poison', name: 'st_death', value: content?.st_death || 10 },
          { label: 'Wands', name: 'st_wands', value: content?.st_wands || 10 },
          { label: 'Paralyze | Stone', name: 'st_para', value: content?.st_para || 10 },
          { label: 'Dragon Breath', name: 'st_dragonb', value: content?.st_dragonb || 10 },
          { label: 'Spells', name: 'st_spells', value: content?.st_spells || 10 },
        ].map(({ label, name, value }) => (
          <div className="grid-item" key={name}>
            <label htmlFor={name}>{label}</label>
            <input name={name} type="number" defaultValue={value} />
          </div>
        ))}
      </div>
      <div className="grid grid-2">
        <div className="grid-item">
          <label htmlFor="gear">
            Gear <small>(describe weapons and armor here)</small>
          </label>
          <textarea name="gear" defaultValue={content?.gear || ''}></textarea>
        </div>
        <div className="grid-item">
          <label htmlFor="notes">
            Notes <small>(describe race and class features here)</small>
          </label>
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
            <label htmlFor="spells">
              Spells list <small>(and description)</small>
            </label>
            <textarea name="spells" defaultValue={content?.spells || ''}></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterForm;
