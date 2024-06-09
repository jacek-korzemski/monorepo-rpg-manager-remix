import styled from 'styled-components';
import logo from './Logo.png';

type LogoSize = {
  width?: string;
  height?: string;
  margin?: string;
  withText?: boolean;
};

const Wrapper = styled.div<LogoSize>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: ${({ width }) => (width ? width : 'auto')};
    height: ${({ height }) => (height ? height : 'auto')};
    max-width: auto;
    max-height: auto;
    margin: ${({ margin }) => (margin ? margin : '0 auto')};
  }
`;

const LogoText = styled.span`
  font-family: 'MedievalSharp', cursive;
  font-weight: 400;
  font-style: normal;
  display: inline-block;
  font-size: 24px;
  color: white;
  margin-left: 16px;
`;

const Logo = ({ width, height, margin, withText }: LogoSize) => {
  return (
    <Wrapper width={width} height={height} margin={margin}>
      <img src={logo} alt={'logo'} />{' '}
      {withText && <LogoText>RPG Manager</LogoText>}
    </Wrapper>
  );
};

export default Logo;
