import React, { useReducer } from 'react';
import styled from 'styled-components';
import { usePlaySequence } from '../play-sequence';
import { reducer, SequenceDispatch, getInitialSequence } from '../bonus-code';
import Transport from './Transport';
import SequencerColumn from './SequencerColumn';
const initial = getInitialSequence();

const Sequencer = ({ input, output }) => {
	const [sequence, dispatch] = useReducer(reducer, initial);
	const [step, isPlaying, setIsPlaying] = usePlaySequence(input, output, sequence);
	const handleClearSequence = () => {
		dispatch({ type: 'clear' });
	};
	return (
		<SequenceDispatch.Provider value={dispatch}>
			<Container>
				<Transport isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
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
	margin: 0.5rem 0;
	display: flex;
`;

const Container = styled.div`
	margin-top: 2rem;
`;

export default Sequencer;
