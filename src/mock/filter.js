const taskToFilterMap = {
  favorites: (tasks) => tasks
    .filter((task) => !task.isArchive)
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
