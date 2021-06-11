const apiRouter = require('express').Router();

const { getAllTags,
  getTagById,
  getAllLinks,
  createLink,
  createTags,
  getLinkById,
  addTagsToLinks,
  updateLinks,
  createLinkTag,
  getLinkByTagName, } = require('../db');

apiRouter.get("/", async (req, res, next) => {
  try {
    const theLinks = await getAllLinks();

    res.send({ links: theLinks });
  } catch (error) {
    next(error);
  }

});

apiRouter.get('/links', async (req, res, next) => {
  //  * - on success, it should send back an object like { reports: theReports }
  //  * - on caught error, call next(error)
  try {
    const theLinks = await getAllLinks();

    res.send({ links: theLinks });
  } catch (error) {
    next(error);
  }

});

apiRouter.get('/tags/:tagName/links', async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;
  console.log(tagName, 'this is the tagname')

  try {
    const linksWithTags = await getLinkByTagName(tagName)


    res.send({ links: linksWithTags })

  } catch (error) {

    next(error)
  }
});

apiRouter.post("/links", async (req, res, next) => {
  const { mainLink, count, comment, name, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const linkData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    linkData.tags = tagArr;
  }
  try {
    (linkData.mainLink = mainLink),
      (linkData.count = count),
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

apiRouter.patch('/links/:linkId', async (req, res, next) => {
  const { linkId } = req.params;
  const { comment, count, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (comment) {
    updateFields.comment = comment;
  }

  updateFields.count = count++;


  try {
    await getLinkById(linkId);


    const updatedLink = await updateLinks(linkId, updateFields);
    res.send({ link: updatedLink })

  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;


