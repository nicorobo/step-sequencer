import React from 'react';
import styled from 'styled-components';

const SequencerNote = ({ index, value, onClick }) => {
	const handleClick = () => {
		onClick(index, value === 0 ? 1 : 0);
	};
	return <Container active={value > 0} onClick={handleClick} />;
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
