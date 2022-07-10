export const loadState = () => {
  try {
    const saveState = localStorage.getItem("EventManager");

    if (saveState === null) {
      return undefined;
    }

    return JSON.parse(saveState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  const stateToBeSaved = JSON.stringify(state);
  localStorage.setItem("EventManager", stateToBeSaved);
};

export const removeState = () => {
  localStorage.removeItem("EventManager");
};
