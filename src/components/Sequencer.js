import React, { useState } from 'react';
import styled from 'styled-components';
import { usePlaySequence } from '../play-sequence';
import SequencerColumn from './SequencerColumn';
const columns = 16;
const rows = 16;

const Sequencer = ({ input, output }) => {
	const [sequence, setSequence] = useState(getInitialSequence(columns, rows));
	const [step] = usePlaySequence(input, output, sequence);

	const handleUpdateColumn = (column) =>
		setSequence(sequence.map((c) => (c.step === column.step ? column : c)));

	const handleClearSequence = () => setSequence(getInitialSequence(columns, rows));
	return (
		<Container>
			<SequencerContainer>
				{sequence.map((column) => (
					<SequencerColumn
						key={column.step}
						playing={step === column.step}
						step={column.step}
						notes={column.notes}
						updateColumn={handleUpdateColumn}
					/>
				))}
			</SequencerContainer>
			<button onClick={handleClearSequence}>Clear</button>
		</Container>
	);
};

const SequencerContainer = styled.div`
	display: flex;
	margin-top: 2rem;
`;

const Container = styled.div``;

const getInitialSequence = (column = 16, rows = 16) => {
	const sequence = [];
	for (var i = 0; i < column; i++) {
		const notes = [];
		for (var j = 0; j < rows; j++) {
			notes.push(0);
		}
		sequence.push({ step: i, notes });
	}
	return sequence;
};

export default Sequencer;
