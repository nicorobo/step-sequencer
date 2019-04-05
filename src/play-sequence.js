import { useState, useEffect } from 'react';
import { midi } from 'tonal';
import { useMIDIClock, useMIDIOutput, useInternalMIDIClock } from '@react-midi/hooks';

const scaleNotes = [
	'C4',
	'D4',
	'Eb4',
	'F4',
	'G4',
	'Ab4',
	'Bb4',
	'C5',
	'D5',
	'Eb5',
	'F5',
	'G5',
	'Ab5',
	'Bb5',
	'C6',
	'D6',
].map((n) => midi(n));

export const usePlaySequence = (input, output, sequence, tempo = 115) => {
	const { noteOn, noteOff } = useMIDIOutput(output);
	const [step, isPlaying, setIsPlaying, setTempo] = useTwoWayClock(input, output, 6, tempo);
	const currentStep = step % sequence.length;
	const notesOff = (step) => {
		sequence[step].forEach((n, i) => {
			if (n <= 0) return false;
			noteOff(scaleNotes[i]);
		});
	};
	const notesOn = (step) => {
		sequence[step].forEach((n, i) => {
			if (n <= 0) return false;
			noteOn(scaleNotes[i]);
		});
	};
	useEffect(() => {
		if (isPlaying) notesOn(currentStep);
		return () => notesOff(currentStep);
	}, [step, isPlaying]);
	return [currentStep, isPlaying, setIsPlaying, setTempo];
};

const useTwoWayClock = (input, output, division, tempo) => {
	const [clock, setClock] = useState([0, false, null, null]);
	const [step, isPlaying] = useMIDIClock(input, division);
	const [stepI, isPlayingI, setIsPlaying, setTempo] = useInternalMIDIClock(
		output,
		division,
		tempo
	);
	// This bit is complicated, maybe overly so
	useEffect(() => {
		if (isPlaying && !isPlayingI && step !== clock.step) setClock([step, isPlaying]);
		else if (stepI !== clock.step) setClock([stepI, isPlayingI, setIsPlaying, setTempo]);
	}, [isPlaying, isPlayingI, step, stepI]);
	return clock;
};
