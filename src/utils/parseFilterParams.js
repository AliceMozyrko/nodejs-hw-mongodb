const parseFavourite = (favourite) => {
  if (typeof favourite === "boolean") {
    return favourite;
  }

  if (["true", "false"].includes(favourite)) {
    return favourite === "true";
  }
  return undefined;
};


export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedFavourite = parseFavourite(isFavourite);

  return {
    isFavourite: parsedFavourite,
    contactType: type,
  };
};
