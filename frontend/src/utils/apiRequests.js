export const signupUser = async (data) => {
  try {
    await fetch('http://localhost:3011/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};
export const loginUser = async (data) => {
  try {
    await fetch('http://localhost:3011/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};
