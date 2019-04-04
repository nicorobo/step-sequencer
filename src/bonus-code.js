import React from 'react';

export const getInitialSequence = (column = 16, rows = 16) => {
	const sequence = [];
	for (var i = 0; i < column; i++) {
		const notes = [];
		for (var j = 0; j < rows; j++) {
			notes.push(0);
		}
		sequence.push(notes);
	}
	return sequence;
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'toggle-note':
			const { col, row } = action;
			const newSequence = state.map((c, i) =>
				i === col ? c.map((r, i) => (i === row ? (r === 0 ? 1 : 0) : r)) : c
			);
			return newSequence;
		case 'clear':
			return getInitialSequence();
		default:
			return state;
	}
};

export const SequenceDispatch = React.createContext();
