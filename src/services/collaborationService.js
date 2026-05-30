import { mockCollaborations } from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let collaborations = JSON.parse(JSON.stringify(mockCollaborations));

export const collaborationService = {
  getAllCollaborations: async () => {
    await delay(300);
    return collaborations;
  },

  getCollaborationsByStatus: async (status) => {
    await delay(300);
    if (status === "all") {
      return collaborations;
    }
    return collaborations.filter((collab) => collab.status === status);
  },

  acceptCollaboration: async (collabId) => {
    await delay(400);
    const collab = collaborations.find((c) => c.id === collabId);
    if (collab) {
      collab.status = "accepted";
    }
    return collab;
  },

  rejectCollaboration: async (collabId) => {
    await delay(400);
    const collab = collaborations.find((c) => c.id === collabId);
    if (collab) {
      collab.status = "rejected";
    }
    return collab;
  },

  addCollaboration: async (newCollab) => {
    await delay(500);
    const collaboration = {
      id: `collab_${Date.now()}`,
      ...newCollab,
      status: "pending",
      dateCollaborated: new Date(),
    };
    collaborations.push(collaboration);
    return collaboration;
  },
};
