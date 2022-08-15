import { DogBreed } from "../types/dog.type";
import { api } from "./api";

export const getDogs = async (breed?: string): Promise<DogBreed> => {
  const { data } = await api.get(`/list?${breed ? "breed=" + breed : ""}`);
  return data;
};
