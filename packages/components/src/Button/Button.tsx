import { ReactNode } from 'react';

const Button = ({
  onClick,
  children,
}: {
  onClick: any;
  children: ReactNode;
}) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
