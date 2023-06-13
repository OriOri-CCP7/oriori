import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserAuth } from './AuthContext';

export interface FavoritesDict {
  [key: string]: Favorite
};

interface FavList {
  favorites: FavoritesDict,
  addFav: (favorite: Favorite) => void,
  removeFav: (productId: number) => void,
  isLoadingFavs: boolean
};

const FavContext = createContext<FavList>({ favorites: {}, addFav: () => {}, removeFav: () => {}, isLoadingFavs: true});

export const FavContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = UserAuth();
  const [favorites, setFavorites] = useState<FavoritesDict>({});
  const [isLoadingFavs, setIsLoadingFavs] = useState(true);
  
  const fetchFavs = () => {
    if (!auth?.user.uuid) return;
    setIsLoadingFavs(true);

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
      setIsLoadingFavs(false);
    })
    .catch((err) => console.log('😈', err));
  };

  useEffect(() => {
    fetchFavs();
  }, [auth?.isLoading]);

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

  return <FavContext.Provider value={{ favorites, addFav, removeFav, isLoadingFavs }}>
    { children }
  </FavContext.Provider>
};

export const UserFavs = () => {
  return useContext(FavContext);
};