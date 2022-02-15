import axios from "axios";
const API_URL = "http://localhost:5600";

const cloudinaryUpload = (fileToUpload) => {
    return axios
        .post(API_URL + "/", fileToUpload)
        .then((res) => res.data)
        .catch((err) => console.log(err));
};

export default cloudinaryUpload;
