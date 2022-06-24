import Head from "next/head";
import FilterList from "../components/FilterList";
import styles from "../styles/Home.module.css";

type Houses = {
  id: string;
  title: string;
  type: string;
  bedrooms: string;
  price: string;
}[];

type HomeProps = {
  houses: Houses;
  children: React.ReactNode;
};

export default function Home({ houses }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Estately - Estate agents</title>
      </Head>
      <main className={styles.main}>
        <form action="" className={styles.filters}>
          <FilterList
            name="houseType"
            label="House Type"
            options={[
              { value: "", label: "Any" },
              { value: "house", label: "House" },
              { value: "flat", label: "Flat" },
              { value: "bungalow", label: "Bungalow" },
              { value: "land", label: "Land" },
            ]}
          />
          <FilterList
            name="bedrooms"
            label="No. of bedrooms"
            options={[
              { value: "", label: "Any" },
              { value: "studio", label: "Studio" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
          />
          <FilterList
            name="sort"
            label="Sort"
            options={[
              { value: "highestPrice", label: "Highest price" },
              { value: "lowestPrice", label: "Lowest Price" },
              { value: "newestListed", label: "Newest Listed" },
              { value: "oldestListed", label: "Oldest Listed" },
            ]}
          />
        </form>

        <div className={styles.grid}>
          {houses.map((house) => {
            return (
              <article key={house.id} className={styles.house}>
                <h3>{house.title}</h3>
                <p>{house.type}</p>
                <p>{house.bedrooms}</p>
                <p>{house.price}</p>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://dev-estate-agent-demo.pantheonsite.io/jsonapi/node/house"
  );
  const { data } = await res.json();

  let houses = data.map((house) => {
    return {
      id: house.id,
      title: house.attributes?.title,
      type: house.attributes?.field_type,
      bedrooms: house.attributes?.field_bedrooms,
      price: `£${new Intl.NumberFormat().format(
        house.attributes?.field_price
      )}`,
    };
  });

  return { props: { houses } };
}
