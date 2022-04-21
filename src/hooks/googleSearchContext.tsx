import React, { createContext, ReactNode, useContext, useState } from "react";
import { apiKey, searchEngineId } from "../credentials/customSearch";
import { seachApi } from "../services/googleSearch";

interface iCustomSearch {
  num?: number;
  search?: string;
  imgSize?: {
    HUGE?: string;
    ICON?: string;
    MEDIUM?: string;
    SMALL?: string;
  };
  imgType: {
    imgTypeUndefined?: string;
    clipart?: string;
    face?: string;
    lineart?: string;
    stock?: string;
    photo: string;
    animated?: string;
  };
  searchType: {
    searchTypeUndefined?: string;
    image: string;
  };
  link?: string;
  safe: string;
}

interface iGoogleSearchContextData {
  googleSearch: iCustomSearch | undefined;
  hasImage: boolean;
  setGoogleSearch: () => iCustomSearch | undefined;
  loadImage: (num: number, search: string) => Promise<any>;
}

interface GoogleSearchProviderProps {
  children: ReactNode;
}

export const GoogleSearchContext = createContext(
  {} as iGoogleSearchContextData
);

export function GoogleSearchProvider({ children }: GoogleSearchProviderProps) {
  const [googleSearch, setGoogleSearch] = useState<iCustomSearch>();

  const customSearch: iCustomSearch = {
    safe: "active",
    imgSize: {
      HUGE: "HUGE",
      ICON: "ICON",
      MEDIUM: "MEDIUM",
      SMALL: "SMALL",
    },
    imgType: {
      imgTypeUndefined: "imgTypeUndefined",
      clipart: "clipart",
      face: "face",
      lineart: "lineart",
      stock: "stock",
      photo: "photo",
      animated: "animated",
    },
    searchType: {
      searchTypeUndefined: "searchTypeUndefined",
      image: "image",
    },
  };

  const loadImage = async (num: number, search: string) => {
    try {
      const response = await seachApi.get(
        `${seachApi.defaults.baseURL}imgType=${customSearch.imgType.photo}&searchType=${customSearch.searchType.image}&safe=${customSearch.safe}&num=${num}&cx=${searchEngineId}&key=${apiKey}&q=${search}`
      );

      if (response.status === 200) {
        console.log(response.data.searchInformation.totalResults);
        setGoogleSearch(response.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoogleSearchContext.Provider
      value={{
        googleSearch,
        setGoogleSearch,
        loadImage,
      }}
    >
      {children}
    </GoogleSearchContext.Provider>
  );
}

export function useGoogleSearchAuth() {
  return useContext(GoogleSearchContext);
}
