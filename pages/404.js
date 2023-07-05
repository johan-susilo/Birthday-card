import { useRouter } from 'next/router';
import { motion as m } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'birthdayCard' });

  return {
    props: {
      birthdayCards: res.items,
    },
  };
}

export default function Success({ birthdayCards }) {
  const [pieces, setPieces] = useState(200);
  console.log(birthdayCards);
  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 6000);
  };
  const router = useRouter();

  useEffect(() => {
    stopConfetti();
  }, []);

  // const inside = birthdayCards
  //   .filter((card) => card.fields.code == router.query.name)
  //   .map((card) => card.fields.name);

  // console.log(insides);

  // if (birthdayCards.includes(thumbnail)) {
  //   console.log('hello');
  // }

  // const exist = birthdayCards.map((card) => {
  //   for (properties in card.fields) {
  //     count += 1;
  //   }
  // });

  // var count = Object.keys(birthdayCards).length;
  // console.log(count);
  const exist = birthdayCards.some(
    (card) => card.fields.code === router.query.code
  );

  const handleClick = () => {
    // 👇️ reset input field's value
    router.push({ pathname: '/' });
  };

  return (
    <div className=" flex h-screen justify-center items-center w-full p-auto top-0 bottom-0 left-0 right-0">
      <div className="flex justify-center items-center relative">
        <div className="bg-white rounded-lg drop-shadow-xl w-full font-latoRegular text-gray-700 m-auto p-20">
          <div className="flex justify-center">
            <h1 className="text-9xl pb-4 font-latoBold">404</h1>
          </div>
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <h1 className="text-3xl pb-4 font-lato">Incorrect Page</h1>
          </div>
          <button
            onClick={handleClick}
            className="bg-violet-800 hover:bg-violet-900 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
          >
            I understand!
          </button>
        </div>
      </div>
    </div>
  );
}
