import React, { ReactNode, CSSProperties } from 'react';

interface LargeButtonProps {
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  style = {},
  onClick = () => {},
  type = 'button',
  children = 'Button',
}) => 
  <button className="text-4xl w-screen text-start font-bold pt-2 pb-2 pl-6 pr-10 flex items-center justify-between" style={style} onClick={onClick}>
    {children}
  </button>;
  
export default LargeButton;