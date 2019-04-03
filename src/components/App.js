import React from 'react';
import styled from 'styled-components';
import { useMIDI, useMIDIConnectionManager } from '@react-midi/hooks';
import { MIDIConnectionManager } from '@react-midi/components';
import Sequencer from './Sequencer';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [input, setInput] = useMIDIConnectionManager(inputs);
	const [output, setOutput] = useMIDIConnectionManager(outputs);
	return (
		<Container>
			<MIDIConnectionManager
				input={input}
				inputs={inputs}
				onInputChange={setInput}
				output={output}
				outputs={outputs}
				onOutputChange={setOutput}
			/>
			{input && <Sequencer input={input} output={output} />}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export default App;
