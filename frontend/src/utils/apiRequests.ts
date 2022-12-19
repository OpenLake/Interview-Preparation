export const queData = async () => {
  const data = await fetch('http://localhost:3011/v1/home/technical');
  const responseData = await data.json();
  //   console.log({ responseData });
  return responseData;
};
