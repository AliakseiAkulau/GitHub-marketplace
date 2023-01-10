// replaceAll typeError in jest
const replaceAll = (sentence, regx, replaceBy) =>
	sentence.replace(regx, replaceBy);
const formatDate = (date) => replaceAll(date, /\//g, '.');
export default formatDate;
