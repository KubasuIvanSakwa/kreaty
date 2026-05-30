import { mockDiscoverCards } from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const discoverService = {
  getAllCards: async () => {
    await delay(400);
    return mockDiscoverCards;
  },

  getCardsByCategory: async (category) => {
    await delay(400);
    if (category === "all") {
      return mockDiscoverCards;
    }
    return mockDiscoverCards.filter((card) => card.category === category);
  },

  searchCards: async (query) => {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return mockDiscoverCards.filter(
      (card) =>
        card.name.toLowerCase().includes(lowerQuery) ||
        card.description.toLowerCase().includes(lowerQuery) ||
        card.author?.toLowerCase().includes(lowerQuery)
    );
  },

  getCardsByAuthor: async (authorUsername) => {
    await delay(300);
    return mockDiscoverCards.filter(
      (card) => card.authorUsername === authorUsername
    );
  },
};
