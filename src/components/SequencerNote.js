import React, { useContext, useMemo, useCallback } from 'react';
import { SequenceDispatch } from '../bonus-code';
import styled from 'styled-components';

const SequencerNote = ({ col, row, value }) => {
	const dispatch = useContext(SequenceDispatch);
	const handleClick = () => dispatch({ type: 'toggle-note', col, row });
	return useMemo(() => <Container active={value > 0} onClick={handleClick} />, [value]);
};

const Container = styled.div`
	height: 15px;
	width: 15px;
	border: 1px solid ${(props) => (props.active ? '#00A9A5' : '#eee')};
	background: ${(props) => (props.active ? '#00A9A5' : '#fff')};
	cursor: pointer;
	&:hover {
		border: 1px solid ${(props) => (props.active ? '#00A9A5' : '#bbb')};
	}
	margin-bottom: 0.25rem;
`;

export default SequencerNote;
