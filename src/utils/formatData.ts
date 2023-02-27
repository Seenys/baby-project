const formatConfirmedGift =  (data: any) => {
  if (!data) return;
  let gifts: any = {};
  Object.keys(data).map((key) => {
    const { Gift, Name } = data[key];
    const giftList = extractData(Gift);
    gifts = { ...gifts, [key]: { giftList, Name } };
  });
  return gifts;
};

const extractData =  (data: any) => {
  let gifts: any = [];
  Object.keys(data).map((key) => {
    const { gift } = data[key];
    gifts = [...gifts, gift];
  });
  return gifts;
};
export { formatConfirmedGift };
