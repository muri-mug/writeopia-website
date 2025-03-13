import React, { ReactNode } from 'react';

interface HeaderButtonProps {
	style?: React.CSSProperties;
	onClick?: () => void;
	children?: ReactNode; // Accepts any valid React children, including components
}

const HeaderButton: React.FC<HeaderButtonProps> = ({style = {}, onClick = () => {}, children = 'Link'}) =>
	<button onClick={onClick} style={style} className='inline-flex justify-center items-center bg-transparent text-black dark:text-white px-2.5 py-2 border-none rounded-lg cursor-pointer text-base font-bold mr-1.5 hover:bg-gray-200 dark:hover:bg-neutral-800'>
		{children}
	</button>;

export default HeaderButton;