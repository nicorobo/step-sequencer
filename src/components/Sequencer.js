import React, { useReducer } from 'react';
import styled from 'styled-components';
import { usePlaySequence } from '../play-sequence';
import { reducer, SequenceDispatch, getInitialSequence } from '../bonus-code';
import SequencerColumn from './SequencerColumn';
const initial = getInitialSequence();

const Sequencer = ({ input, output }) => {
	const [sequence, dispatch] = useReducer(reducer, initial);
	const [step] = usePlaySequence(input, output, sequence);
	const handleClearSequence = () => {
		dispatch({ type: 'clear' });
	};
	// console.table(sequence);
	return (
		<SequenceDispatch.Provider value={dispatch}>
			<Container>
				<SequencerContainer>
					{sequence.map((column, i) => (
						<SequencerColumn key={i} col={i} playing={step === i} notes={column} />
					))}
				</SequencerContainer>
				<button onClick={handleClearSequence}>Clear</button>
			</Container>
		</SequenceDispatch.Provider>
	);
};

const SequencerContainer = styled.div`
	display: flex;
	margin-top: 2rem;
`;

const Container = styled.div``;

export default Sequencer;
