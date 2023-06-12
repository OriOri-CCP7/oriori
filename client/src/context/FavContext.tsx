import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserAuth } from './AuthContext';

export interface FavoritesDict {
  [key: string]: Favorite
};

interface FavList {
  favorites: FavoritesDict,
  addFav: (favorite: Favorite) => void,
  removeFav: (productId: number) => void
};

const FavContext = createContext<FavList>({ favorites: {}, addFav: (favorite: Favorite) => {}, removeFav: (productId: number) => {} });

export const FavContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = UserAuth();
  const [favorites, setFavorites] = useState<FavoritesDict>({});
  
  const fetchFavs = () => {
    if (!auth) return;

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth.csrftoken ?? ""
    };

    axios.get(`/api/favorites/${auth.user.uuid}/`, {
      headers: headers
    }).then((response) => {
      console.log('⭐️', response);
      let workingFavs: FavoritesDict = {};
      response.data.forEach((favorite: Favorite) => {
        workingFavs[favorite.product.toString()] = favorite;
      });
      setFavorites(workingFavs);
    })
    .catch((err) => console.log('😈', err));
  };

  useEffect(() => {
    fetchFavs();
  }, [auth]);

  const addFav = (favorite: Favorite) => {
    setFavorites({
      ...favorites,
      [favorite.product]: favorite
    });
  };

  const removeFav = (productId: number) => {
    let workingFavs: FavoritesDict = favorites;
    delete workingFavs[productId];
    setFavorites(workingFavs);
  };

  return <FavContext.Provider value={{ favorites, addFav, removeFav }}>
    { children }
  </FavContext.Provider>
};

export const UserFavs = () => {
  return useContext(FavContext);
};