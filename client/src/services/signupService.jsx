import axios from "axios";

const handleSignup = async (name, email, username, password) => {
  const data = {
    fullName: name,
    email: email,
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(
      "http://localhost:8000/users/post/",
      data,
    );

    console.log("Data:", response.data);
    console.log("Status:", response.status);

    return response;
  } catch (err) {
    console.log("Signup error:", err);

    throw err;
  }
};

export default handleSignup;
