export const queData = async (type: any) => {
  const data = await fetch(`http://localhost:3011/v1/home/${type}`);
  const responseData = await data.json();
  // console.log({ responseData });
  return responseData.data;
};

export const registerUser = async (userDetails: any) => {
  try {
    const data = await fetch('http://localhost:3011/v1/users/signup', {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userDetails),
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (userAuth: any) => {
  try {
    const data = await fetch('http://localhost:3011/v1/users/login', {
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        method: 'POST',
        body: JSON.stringify(userAuth),
      },
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getqestion = async (queId: any) => {
  const response = await fetch(`http://localhost:3011/v1/home/que/${queId}`);
  const responseData = await response.json();
  console.log(responseData);
  return responseData.data;
};

export const getComments = async (queId: any) => {
  const response = await fetch(`http://localhost:3011/v1/comments/${queId}`);
  const responseData = await response.json();
  console.log({ responseData });
  return responseData.data;
};
