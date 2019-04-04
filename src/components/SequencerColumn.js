import React, { useMemo } from 'react';
import styled from 'styled-components';
import SequencerNote from './SequencerNote';

const SequencerColumn = ({ col, playing, notes }) =>
	useMemo(
		() => (
			<Container>
				<StepToggle playing={playing} />
				{notes.map((note, i) => (
					<SequencerNote key={i} col={col} row={i} value={note} />
				))}
			</Container>
		),
		[notes, playing]
	);

const Container = styled.div`
	margin-right: 0.25rem;
`;
const StepToggle = styled.div`
	height: 5px;
    width: 15px;
    border: 1px solid ${(props) => (props.playing ? '#00A9A5' : '#eee')};
    background: ${(props) => (props.playing ? '#00A9A5' : '#fff')}
	margin-bottom: 0.25rem;
`;
export default SequencerColumn;
