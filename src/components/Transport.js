import React from 'react';
const Transport = ({ isPlaying, setIsPlaying }) => {
	const handlePlay = () => setIsPlaying && setIsPlaying(true);
	const handleStop = () => setIsPlaying && setIsPlaying(false);
	return (
		<div>
			<button onClick={handlePlay} disabled={!setIsPlaying || isPlaying}>
				Play
			</button>
			<button onClick={handleStop} disabled={!setIsPlaying || !isPlaying}>
				Stop
			</button>
			{!setIsPlaying && <span>Using external clock</span>}
		</div>
	);
};
export default Transport;
