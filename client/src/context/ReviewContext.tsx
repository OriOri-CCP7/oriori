import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserAuth } from './AuthContext';

interface ReviewsDict {
  [key: string]: Review
};

interface ReviewList {
  reviews: ReviewsDict,
  addRev: (review: Review) => void,
  removeRev: (productId: number) => void,
  updateRev: (review: Review) => void,
  isLoadingRevs: boolean
};

const ReviewContext = createContext<ReviewList>({ reviews: {}, addRev: () => {}, removeRev: () => {}, updateRev: () => {}, isLoadingRevs: true});

export const ReviewContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = UserAuth();
  const [reviews, setReviews] = useState<ReviewsDict>({});
  const [isLoadingRevs, setIsLoadingRevs] = useState(true);
  
  const fetchReviews = () => {
    if (!auth?.user.uuid) return;
    setIsLoadingRevs(true);

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth.csrftoken ?? ""
    };

    axios.get(`/api/users/${auth.user.uuid}/reviews/`, {
      headers: headers
    }).then((response) => {
      console.log('⭐️', response);
      let workingRevs: ReviewsDict = {};
      response.data.forEach((review: Review) => {
        workingRevs[review.product.toString()] = review;
      });
      setReviews(workingRevs);
      setIsLoadingRevs(false);
    })
    .catch((err) => console.log('😈', err));
  };

  useEffect(() => {
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isLoading]);

  const addRev = (review: Review) => {
    setReviews({
      ...reviews,
      [review.product]: review
    });
  };

  const removeRev = (productId: number) => {
    let workingRevs: ReviewsDict = reviews;
    delete workingRevs[productId];
    setReviews(workingRevs);
  };

  const updateRev = (review: Review) => {
    let workingRevs: ReviewsDict = reviews;
    workingRevs[review.product.toString()] = review;
    setReviews(workingRevs);
  };

  return <ReviewContext.Provider value={{ reviews, addRev, removeRev, updateRev, isLoadingRevs }}>
    { children }
  </ReviewContext.Provider>
};

export const UserReviews = () => {
  return useContext(ReviewContext);
};