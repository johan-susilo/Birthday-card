import { useRouter } from 'next/router';
import { motion as m } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';

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
  // console.log(birthdayCards);
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

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" h-full items-center flex justify-center relative m-10"
    >
      {birthdayCards
        .filter((card) => card.fields.code == router.query.code)
        .map((card) => (
          <div
            key={card.sys.id}
            className="bg-white rounded-lg drop-shadow-xl w-4/5 font-latoRegular text-gray-700 p-10"
          >
            <h1 className="text-3xl pb-4 font-latoBold">
              {card.fields.title}! 🎉
            </h1>
            <p className="text-lg  text-gray-500">{card.fields.text}</p>

            {
              <Image
                src={'https:' + card.fields.thumbnail.fields.file.url}
                width={card.fields.thumbnail.fields.file.details.image.width}
                height={card.fields.thumbnail.fields.file.details.image.height}
              />
            }

            <p className="text-md mt-2"> —Johan 典漢</p>
          </div>
        ))}

      <Confetti gravity={0.2} numberOfPieces={pieces} />
    </m.main>
  );
}
