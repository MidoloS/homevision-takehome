export type HouseData = {
  id: number;
  address: string;
  homeowner: string;
  price: number;
  photoURL: string;
};

export type HousesApiSuccess = {
  houses: HouseData[];
  ok: true;
};

export type HousesApiError = {
  message: string;
  ok: false;
};

export type HousesApiResponse = HousesApiSuccess | HousesApiError;
