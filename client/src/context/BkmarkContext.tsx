import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserAuth } from './AuthContext';

interface BookmarksDict {
  [key: string]: Bookmark
};

interface BkmarkList {
  bookmarks: BookmarksDict,
  addBkmark: (bookmark: Bookmark) => void,
  removeBkmark: (productId: number) => void,
  isLoadingBkmarks: boolean
};

const BkmarkContext = createContext<BkmarkList>({ bookmarks: {}, addBkmark: () => {}, removeBkmark: () => {}, isLoadingBkmarks: true});

export const BkmarkContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = UserAuth();
  const [bookmarks, setBookmarks] = useState<BookmarksDict>({});
  const [isLoadingBkmarks, setIsLoadingBkmarks] = useState(true);
  
  const fetchBkmarks = () => {
    if (!auth?.user.uuid) return;
    setIsLoadingBkmarks(true);

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth.csrftoken ?? ""
    };

    axios.get(`/api/users/${auth.user.uuid}/bookmarks/`, {
      headers: headers
    }).then((response) => {
      console.log('⭐️', response);
      let workingBkmarks: BookmarksDict = {};
      response.data.forEach((bookmark: Bookmark) => {
        workingBkmarks[bookmark.product.toString()] = bookmark;
      });
      setBookmarks(workingBkmarks);
      setIsLoadingBkmarks(false);
    })
    .catch((err) => console.log('😈', err));
  };

  useEffect(() => {
    fetchBkmarks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isLoading]);

  const addBkmark = (bookmark: Bookmark) => {
    setBookmarks({
      ...bookmarks,
      [bookmark.product]: bookmark
    });
  };

  const removeBkmark = (productId: number) => {
    let workingBkmarks: BookmarksDict = bookmarks;
    delete workingBkmarks[productId];
    setBookmarks(workingBkmarks);
  };

  return <BkmarkContext.Provider value={{ bookmarks, addBkmark, removeBkmark, isLoadingBkmarks }}>
    { children }
  </BkmarkContext.Provider>
};

export const UserBkmarks = () => {
  return useContext(BkmarkContext);
};