import { User } from "@/constants/types";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/users";

async function fetchData(id: string): Promise<User>;
async function fetchData(id?: undefined): Promise<User[]>;
async function fetchData(id?: string): Promise<User | User[]> {
  try {
    const response = await axios.get<User | User[]>(
      `${baseURL}${id ? `/${id}` : ""}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default fetchData;
