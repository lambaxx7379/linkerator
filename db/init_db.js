// code to build and initialize DB goes here
const {
  client,
  getAllTags,
  getTagById,
  getAllLinks,
  createLink,
  createTag,
  // other db methods 
} = require('./index');


async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");
    client.query(`
 
    DROP TABLE IF EXISTS link_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS links;
  `);
    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`

    CREATE TABLE links(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        "mainLink" TEXT NOT NULL,
        count INTEGER,
        comment VARCHAR(255),
        share_date DATE default CURRENT_DATE
        
    );

    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name varchar(25) UNIQUE,
      "tagId" INTEGER REFERENCES links(id)
    );

    CREATE TABLE link_tags(
      "linkId" INTEGER REFERENCES links(id),
      "tagId" INTEGER REFERENCES tags(id),
      UNIQUE("linkId","tagId")
  );

  `);

    console.log("Finished building tables!");


  } catch (error) {
    throw error;
  }


}

async function populateInitialLinks() {
  try {
    console.log('starting to create links...');

    const linksToCreate = [
      { name: 'FullStack Academy', mainLink: 'https://www.fullstackacademy.com', count: 0, comment: 'Love this site.' },
      { name: 'LinkedIn', mainLink: 'https://www.linkedin.com/', count: 0, comment: 'Great for networking.' },
      { name: 'DEV', mainLink: 'https://dev.to/', count: 0, comment: 'Fantastic dev community, lots of great info.' },

    ]

    const links = await Promise.all(linksToCreate.map(link => createLink(link)));
    console.log('Links Created: ', links)
    console.log('Finished creating links.')
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await populateInitialLinks()

  } catch (error) {
    throw error;
  }
}

// async function rebuildDB() {
//   try {
//     client.connect();

//     await buildTables();
//     await createTables();
//     await createInitialUsers();
//     await createInitialPosts();
//   } catch (error) {
//     console.log("Error during rebuildDB");
//     throw error;
//   }
// }

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());