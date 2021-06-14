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

export async function updateLink(linkId, updatedInfo) {
  try {
    const { data } = await axios.patch(`/api/links/${linkId.id}`, updatedInfo);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCount(id) {
  try {
    const { data } = await axios.put(`/api/links/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}
