import axios from "axios";

export async function getLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data.links;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get("/api/tags");
    return data.tags;
  } catch (error) {
    throw error;
  }
}

export async function createNewLink(name, mainLink, comment, tags) {
  try {
    const { data } = await axios.post("/api/links", {
      name,
      mainLink,
      comment,
      tags,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateLink(comment, id) {
  try {
    let updatedInfo = {};
    console.log(comment);
    console.log(id);
    let newComment = prompt(
      "What would you like to change the comment to?",
      comment
    );

    if (newComment) {
      updatedInfo.comment = newComment;
    }
    const { data } = await axios.patch(`/api/links/${id}`, updatedInfo);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCount(id) {
  try {
    const { data } = await axios.patch(`/api/links/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function linksWithTags(tagName) {
  try {
    const { data } = await axios.get(`/api/tags/${tagName}/links`);
    return data.links;
  } catch (error) {
    throw error;
  }
}
