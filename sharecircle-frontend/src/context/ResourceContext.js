import React, { createContext, useState, useEffect } from "react";

export const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);

  // Load from localStorage on app start
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resources"));
    if (saved) setResources(saved);
  }, []);

  // Save to localStorage whenever resources change
  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const addResource = (item) => {
    setResources([...resources, item]);
  };

  return (
    <ResourceContext.Provider value={{ resources, addResource }}>
      {children}
    </ResourceContext.Provider>
  );
};
