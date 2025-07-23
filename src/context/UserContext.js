import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const secretsWithinUserLoad = async () => {
      try {
        const secretsWithinUserStored = await AsyncStorage.getItem('currentUser');
        if (secretsWithinUserStored) {
          setUser(JSON.parse(secretsWithinUserStored));
        }
      } catch (error) {
        console.error('Error user cevrets within: ', error);
      }
    };
    secretsWithinUserLoad();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
