const serverURL = 'interview-preparation-production.up.railway.app/v1';

export const queData = async (type: any) => {
  try {
    console.log(`${serverURL}/home/${type}`);
    const data = await fetch(`${serverURL}/home/${type}`);
    const responseData = await data.json();
    return responseData.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = async (userDetails: any) => {
  try {
    const data = await fetch(`${serverURL}/users/signup`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userDetails),
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (userAuth: any) => {
  try {
    const data = await fetch(`${serverURL}/users/login`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userAuth),
    });
    const response = await data.json();
    return { body: response, status: data.ok || false };
  } catch (err) {
    console.log(err);
  }
};

export const getqestion = async (queId: any) => {
  try {
    const response = await fetch(`${serverURL}/home/que/${queId}`);
    const responseData = await response.json();
    return responseData.data;
  } catch (err) {
    console.log(err);
  }
};

export const getComments = async (queId: any) => {
  try {
    const response = await fetch(`${serverURL}/comments/${queId}`);
    const responseData = await response.json();
    return responseData.data;
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (commentData: any) => {
  try {
    await fetch(`${serverURL}/comments/post`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (userId: any) => {
  try {
    const data = await fetch(`${serverURL}/users/${userId}`);
    const response = await data.json();
    console.log({ response });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const likeQuestion = async (queId: any, userId: any) => {
  try {
    const data = await fetch(`http://localhost:3011/home/que/${queId}/like`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ _id: userId }),
    });
    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const unlikeQuestion = async (queId: any, userId: any) => {
  try {
    const data = await fetch(`http://localhost:3011/home/que/${queId}/unlike`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ _id: userId }),
    });
    const response = await data.json();
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
