import styled from 'styled-components';
import logo from './Logo.png';

type LogoSize = {
  width?: string;
  height?: string;
  margin?: string;
};

const Wrapper = styled.div<LogoSize>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-width: auto;
  max-height: auto;
  margin: ${({ margin }) => (margin ? margin : '0 auto')};
  img {
    max-width: 100%;
  }
`;

const Logo = ({ width, height, margin }: LogoSize) => {
  return (
    <Wrapper width={width} height={height} margin={margin}>
      <img src={logo} alt={'logo'} />
    </Wrapper>
  );
};

export default Logo;
