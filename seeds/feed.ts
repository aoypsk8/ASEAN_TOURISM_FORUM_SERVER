exports.seed = function (knex: any) {
  // Ensure that the 'feeds' array is defined
  const feeds = [
    {
      title: "OKdo Metal Case for ROCK 5",
      description:
        "This nifty case from Radxa is tailor-made for the ROCK 5 Model B single board computer. It’s a robust metal case built to provide protection to your board whilst allowing easy access to all the ROCK 5B’s ports and PINs. It features an integrated heatsink, which provides passive cooling to your board ensuring your ROCK 5B will stay cool and keep ROCKing under the most demanding conditions",
      images: [
        'product_01.jpg',
        'product_02.jpg',
        'product_03.jpg',
        'product_04.jpg',
        'product_05.jpg',
      ],
      createdAt: new Date(),
    },
    {
      title: "OKdo Metal Case for ROCK 5",
      description:
        "This nifty case from Radxa is tailor-made for the ROCK 5 Model B single board computer. It’s a robust metal case built to provide protection to your board whilst allowing easy access to all the ROCK 5B’s ports and PINs. It features an integrated heatsink, which provides passive cooling to your board ensuring your ROCK 5B will stay cool and keep ROCKing under the most demanding conditions",
      images: [
        'product_01.jpg',
        'product_02.jpg',
        'product_03.jpg',
        'product_04.jpg',
        'product_05.jpg',
      ],
      createdAt: new Date(),
    },
    {
      title: "OKdo Metal Case for ROCK 5",
      description:
        "This nifty case from Radxa is tailor-made for the ROCK 5 Model B single board computer. It’s a robust metal case built to provide protection to your board whilst allowing easy access to all the ROCK 5B’s ports and PINs. It features an integrated heatsink, which provides passive cooling to your board ensuring your ROCK 5B will stay cool and keep ROCKing under the most demanding conditions",
      images: [
        'product_01.jpg',
        'product_02.jpg',
        'product_03.jpg',
        'product_04.jpg',
        'product_05.jpg',
      ],
      createdAt: new Date(),
    },
    {
      title: "OKdo Metal Case for ROCK 5",
      description:
        "This nifty case from Radxa is tailor-made for the ROCK 5 Model B single board computer. It’s a robust metal case built to provide protection to your board whilst allowing easy access to all the ROCK 5B’s ports and PINs. It features an integrated heatsink, which provides passive cooling to your board ensuring your ROCK 5B will stay cool and keep ROCKing under the most demanding conditions",
      images: [
        'product_01.jpg',
        'product_02.jpg',
        'product_03.jpg',
        'product_04.jpg',
        'product_05.jpg',
      ],
      createdAt: new Date(),
    },
    {
      title: "OKdo Metal Case for ROCK 5",
      description:
        "This nifty case from Radxa is tailor-made for the ROCK 5 Model B single board computer. It’s a robust metal case built to provide protection to your board whilst allowing easy access to all the ROCK 5B’s ports and PINs. It features an integrated heatsink, which provides passive cooling to your board ensuring your ROCK 5B will stay cool and keep ROCKing under the most demanding conditions",
      images: [
        'product_01.jpg',
        'product_02.jpg',
        'product_03.jpg',
        'product_04.jpg',
        'product_05.jpg',
      ],
      createdAt: new Date(),
    },
    {
      title: "OKdo Metal Case for ROCK 5",
      description:
        "This nifty case from Radxa is tailor-made for the ROCK 5 Model B single board computer. It’s a robust metal case built to provide protection to your board whilst allowing easy access to all the ROCK 5B’s ports and PINs. It features an integrated heatsink, which provides passive cooling to your board ensuring your ROCK 5B will stay cool and keep ROCKing under the most demanding conditions",
      images: [
        'product_01.jpg',
        'product_02.jpg',
        'product_03.jpg',
        'product_04.jpg',
        'product_05.jpg',
      ],
      createdAt: new Date(),
    },
    
  ];

  return knex('feeds')
    .del()
    .then(function () {
      return knex('feeds').insert(
        feeds.map(feed => ({
          title: feed.title,
          description: feed.description,
          images: JSON.stringify(feed.images), 
          created_at: feed.createdAt,
          updated_at: feed.createdAt, 
        }))
      );
    });
};
