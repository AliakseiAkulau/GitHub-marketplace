const formatAuthors = (allAuthors, searchAuthors) =>
	allAuthors
		?.filter((allItem) =>
			searchAuthors?.some((searchItem) => allItem.id === searchItem)
		)
		.map((item) => item.name)
		.join(', ');

export default formatAuthors;
