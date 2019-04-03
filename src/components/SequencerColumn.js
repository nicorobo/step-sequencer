import React from 'react';
import styled from 'styled-components';
import SequencerNote from './SequencerNote';

const SequencerColumn = ({ playing, step, notes, updateColumn }) => {
	const handleNoteChange = (index, value) => {
		const newNotes = notes.map((n, i) => (i === index ? value : n));
		updateColumn({ step, notes: newNotes });
	};
	return (
		<Container>
			<StepToggle playing={playing} />
			{notes.map((note, i) => (
				<SequencerNote key={i} index={i} value={note} onClick={handleNoteChange} />
			))}
		</Container>
	);
};
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
