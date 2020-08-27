const taskToFilterMap = {
  watchList: (tasks) => tasks
    .filter((task) => task.isWatchlist).length,
  watched: (tasks) => tasks
    .filter((task) => task.isWatched).length,
  favorites: (tasks) => tasks
    .filter((task) => task.isFavorite).length,
};

export const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(tasks),
    };
  });
};
