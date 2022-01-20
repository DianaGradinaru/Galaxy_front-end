import { atom } from "jotai";

const state = {
    posts: atom([]),
    favorites: atom([]),
    user: atom(JSON.parse(localStorage.getItem("loggedUser")) || {}),
};

export default state;
