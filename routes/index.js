const apiRouter = require("express").Router();

const { ID } = require("webpack/lib/ModuleFilenameHelpers");
const {
  getAllTags,
  getTagById,
  getAllLinks,
  changeCount,
  createLink,
  createTags,
  getLinkById,
  addTagsToLinks,
  updateLinks,
  createLinkTag,
  getLinkByTagName,
  updateComment,
} = require("../db");

apiRouter.get("/", async (req, res, next) => {
  try {
    const theLinks = await getAllLinks();

    res.send({ links: theLinks });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/links", async (req, res, next) => {
  try {
    const theLinks = await getAllLinks();

    res.send({ links: theLinks });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/tags", async (req, res, next) => {
  try {
    const theTags = await getAllTags();

    res.send({ tags: theTags });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/tags/:tagName/links", async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;

  try {
    const linksWithTags = await getLinkByTagName(tagName);

    res.send(linksWithTags);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/links", async (req, res, next) => {
  const { mainLink, comment, name, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const linkData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    linkData.tags = tagArr;
  }
  try {
    (linkData.mainLink = mainLink),
      (linkData.comment = comment),
      (linkData.name = name);

    const link = await createLink(linkData);
    // this will create the link and the tags for us
    res.send(link);
    //otherwise, next an appropriate error object
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/links/:linkId", async (req, res, next) => {
  const { linkId } = req.params;
  const { comment, name, tags } = req.body;

  const updateFields = {};

  if (comment) {
    updateFields.comment = comment;
  }

  try {
    // await changeCount(linkId);
    await getLinkById(linkId);

    const updatedLink = await updateComment(comment, linkId);
    res.send({ link: updatedLink });
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/links/:linkId/count", async (req, res, next) => {
  const { linkId } = req.params;

  try {
    const clicked = await changeCount(linkId);
    res.send(clicked);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
