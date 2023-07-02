export const getTime = (num: number) => {
	if (num === 0) {
		return '00:00';
	}
	const hours = Math.floor(num / 60);
	const dateHours = hours < 10 ? `0${hours}` : hours;
	const minutes = num % 60;
	const dateMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${dateHours}:${dateMinutes}`;
};
