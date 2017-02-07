import React from 'react';
import map from 'lodash.map';
import styled, {css} from 'styled-components';
import {observe} from './store';
import * as components from '../src/components';

const Split = styled.div`
display: flex;
flex-direction: ${({direction}) => direction};
`;

const GridChild = styled.div`
${({flex}) => flex && css`flex: ${flex};`}
`;

const Grid = ({layout, direction = 'row', keys = []}) => <Split direction={direction}>
	{layout.map((child, i) => React.isValidElement(child) ?
		<GridChild key={keys.concat(i).join('.')} {...child.props}>{child}</GridChild> :
		<Grid key={keys.concat(i).join('.')} keys={keys.concat(i)} layout={child} direction={direction === 'row' ? 'column': 'row'} />
	)}
</Split>;

const mapLayout = (layout, which) => layout.map(child =>
	Array.isArray(child) ? mapLayout(child, which)
	: child.component    ? React.createElement(components[child.component][which], child)
	: React.createElement(components[child][which])
);

export default observe(({which}, {subscribe}) => <Grid layout={mapLayout(subscribe('layout', []), which)} />);