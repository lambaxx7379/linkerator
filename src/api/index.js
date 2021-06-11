import axios from "axios";

export async function getLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data;
  } catch (error) {
    throw error;
  }
}

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

export async function createNewLink(newLink) {
  try {
    const { data } = await axios.post("/api/links", newLink);
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
    const { data } = await axios.put(`/api/links/${id}/clicked`);
    return data;
  } catch (error) {
    throw error;
  }
}
