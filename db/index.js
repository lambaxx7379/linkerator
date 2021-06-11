// Connect to DB comment for test push
const { Client } = require("pg");
const DB_NAME = "localhost:5432/linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

async function getTagById(id) {
  // return the tag
  try {
    const {
      rows: [tag],
    } = await client.query(`
          SELECT *
          FROM tags
          WHERE id=${id};
        `);

    return tag;
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  // return the tags
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM tags;
  `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getLinkById(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(`
        SELECT *
        FROM links
        WHERE id=${linkId};
      `);

    const { rows: tags } = await client.query(
      `
        SELECT tags.*
        FROM tags
        JOIN link_tags ON tags.id=link_tags."tagId"
        WHERE link_tags."linkId"=$1;
      `,
      [linkId]
    );

    link.tags = tags;
    console.log(link, "this is my return from get link by id");
    return link;
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  // select and return an array of all link, include their tags - need to get tags
  try {
    const { rows: id } = await client.query(`
    SELECT id 
    FROM links;
  `);

    const links = await Promise.all(id.map((link) => getLinkById(link.id)));
    return links;
  } catch (error) {
    throw error;
  }
}

async function createLink({ name, mainLink, comment, tags = [] }) {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
            INSERT INTO links(name, "mainLink", comment)
            VALUES($1, $2, $3)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
         `,
      [name, mainLink, comment]
    );
    const tagList = await createTags(tags);
    return await addTagsToLinks(links.id, tagList);
  } catch (error) {
    console.log("Could not create links index.js");
    throw error;
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");
  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      `
    INSERT INTO tags(name)
    VALUES (${insertValues})
    ON CONFLICT (name) DO NOTHING;`,
      tagList
    );

    const { rows } = await client.query(
      `
    SELECT * FROM tags
    WHERE name
    IN (${selectValues});
    `,
      tagList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function addTagsToLinks(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map((tag) =>
      createLinkTag(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function updateLinks(linkId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE links
        SET ${setString}
        WHERE id=${linkId}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    const tagList = await createTags(tags);
    const tagListIdString = tagList.map((tag) => `${tag.id}`).join(", ");

    await client.query(
      `
      DELETE FROM link_tags
      WHERE "tagId"
      NOT IN (${tagListIdString})
      AND "linkId"=$1;
    `,
      [linkId]
    );

    await addTagsToLinks(linkId, tagList);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      `
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `,
      [linkId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function getLinkByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(
      `
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tags.name=$1;
    `,
      [tagName]
    );

    return await Promise.all(linkIds.map((link) => getLinkById(link.id)));
  } catch (error) {
    throw error;
  }
}

async function changeCount(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(`
            UPDATE links 
            SET count = count + 1
            WHERE id = ${linkId}
            RETURNING *;
        `);

    return link;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  changeCount,
  getAllTags,
  getTagById,
  getAllLinks,
  createLink,
  createTags,
  getLinkById,
  addTagsToLinks,
  updateLinks,
  createLinkTag,
  getLinkByTagName,
};
