import axios, { AxiosResponse } from 'axios';
import User from "../models/users/User";

axios.defaults.baseURL = process.env.BASE_URL;

const findAllUsers = async () =>
    await axios.get('/api/users');

const findUserById = async (uid: string) => {
  return await axios.get(`/api/users/${uid}`);
}

const createUser = async (user: User) =>
  await axios.post('/api/users', user);

const updateUser = async (uid: string, user: User) =>
  await axios.put(`api//users/${uid}`, user);

const deleteUser = async (uid: string) =>
  await axios.delete(`api/users/${uid}`);
