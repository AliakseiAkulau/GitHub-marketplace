const formatToString = (num) => (num < 10 ? `0${num}` : `${num}`);

export const pipeDuration = (duration) =>
	`${Math.floor(duration / 60)}:${formatToString(duration % 60)}`;

export default pipeDuration;
