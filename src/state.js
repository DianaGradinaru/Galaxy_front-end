import { atom } from "jotai";

const state = {
    posts: atom([]),
    user: atom({}),
};

export default state;
