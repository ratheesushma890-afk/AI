const STORAGE_KEY = "tripperDestinations";

export const getDestinations = (defaultData = []) => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      return JSON.parse(savedData);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultData)
    );

    return defaultData;
  } catch (error) {
    console.error("Destination load error:", error);
    return defaultData;
  }
};

export const saveDestinations = (data) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Destination save error:", error);
  }
};