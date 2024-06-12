import React from 'react';
import styled from 'styled-components';

interface Content {
  note?: string;
}

interface Props {
  content?: Content;
}

const NoteContent: React.FC<Props> = ({ content }) => {
  return (
    <StyledContainer>
      <div className="grid-item">
        <label htmlFor="note">Content of the note</label>
        <textarea name="note" defaultValue={content?.note || ''}></textarea>
      </div>
    </StyledContainer>
  );
};

export default NoteContent;

const StyledContainer = styled.div`
  .grid-item {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 5px;
    }
    textarea {
      padding: 5px;
      font-size: 1rem;
    }
  }
`;
