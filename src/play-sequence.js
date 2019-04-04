import { useEffect } from 'react';
import { midi } from 'tonal';
import { useMIDIClock, useMIDIOutput } from '@react-midi/hooks';

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

export const usePlaySequence = (input, output, sequence) => {
	const { noteOn, noteOff } = useMIDIOutput(output);
	const [step, isPlaying] = useMIDIClock(input, 6);
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
	return [currentStep, isPlaying];
};
