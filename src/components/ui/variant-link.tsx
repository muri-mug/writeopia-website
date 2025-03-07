import React from 'react';
import { Link } from 'react-router-dom';

const VariantLink = ({ style = {}, to = '/', children }: { style?: React.CSSProperties, to?: string, children: React.ReactNode }) => 
	<Link className='variant-link' style={style} to={to}>
		{children}
	</Link>;

export default VariantLink;