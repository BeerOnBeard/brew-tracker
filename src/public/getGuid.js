let getGuid = () => {
  let getRandomFour = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  return `${getRandomFour()}${getRandomFour()}-${getRandomFour()}-${getRandomFour()}-${getRandomFour()}${getRandomFour()}${getRandomFour()}`.toLowerCase();
};
