/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { Dropdown } from "../components/Dropdown";
import { getDogs } from "../services/dog.service";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header/Header";

interface IBreed {
  id: number;
  name: string;
}

const breeds: IBreed[] = [
  { id: 1, name: "chihuahua" },
  { id: 2, name: "husky" },
  { id: 3, name: "labrador" },
  { id: 4, name: "pug" },
];

const Home: NextPage = () => {
  const [breed, setBreed] = useState<IBreed>(breeds[0]);
  const perPage = 12;
  const [lastPosition, setLastPosition] = useState(perPage);
  const [allDogs, setAllDogs] = useState<string[]>([]);
  const [dogs, setDogs] = useState<string[]>([]);
  const [hasMore, setHasmore] = useState<boolean>(true);

  useEffect(() => {
    const fetchDogs = async () => {
      const dogsArray = await getDogs(breed.name);
      setAllDogs(dogsArray.list);
      setDogs(dogsArray.list.slice(0, perPage));
    };
    fetchDogs();
  }, [breed.name]);

  const fetchMoreData = useCallback(() => {
    setTimeout(() => {
      setDogs((prev) => [
        ...prev,
        ...allDogs.slice(lastPosition, lastPosition + perPage),
      ]);
    }, 1000);
    setLastPosition(lastPosition + perPage);
    setHasmore(allDogs.length > dogs.length);
  }, [allDogs, dogs.length, lastPosition]);

  return (
    <>
      <Header />
      <div className="h-full">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-end items-center">
          <label className="font-bold mr-5 text-lg text-blue-600">
            Choose a dog breed:{" "}
          </label>
          <Dropdown list={breeds} onChange={setBreed} selected={breed} />
        </div>
        <div className="max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 bg-white">
          <div className="py-10">
            <h2 className="font-bold leading-tight text-4xl mt-0 mb-2">
              Dog Breed - {breed.name}
            </h2>
          </div>
          <InfiniteScroll
            dataLength={dogs.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<></>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {dogs.length > 0 &&
                dogs.map((dog, index) => (
                  <div key={index} className="group">
                    <div className="w-full h-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={dog}
                        alt=""
                        className="w-full h-full object-center scale-90 hover:scale-100 object-cover group-hover:opacity-75"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
