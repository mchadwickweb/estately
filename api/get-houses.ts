export type HouseListType = {
  id: string;
  title: string;
  type: string;
  bedrooms: string;
  price: string;
}[];

export async function getHouses(filter?: string) {
  let endpoint = `https://dev-estate-agent-demo.pantheonsite.io/jsonapi/node/house${
    filter ? filter : ""
  }`;
  const res = await fetch(endpoint);
  const { data } = await res.json();

  return data
    .map((house) => {
      return {
        id: house.id,
        title: house.attributes?.title,
        type: house.attributes?.field_type,
        bedrooms: house.attributes?.field_bedrooms,
        price: `£${new Intl.NumberFormat().format(
          house.attributes?.field_price
        )}`,
      };
    })
    .reverse();
}
