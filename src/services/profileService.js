import {
  mockProfiles,
  mockDiscoverCards,
  mockPortfolio,
  mockStats,
} from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const profileService = {
  getCurrentProfile: async () => {
    await delay(300);
    return mockProfiles.currentUser;
  },

  getPublicProfile: async (username) => {
    await delay(300);
    const profile = mockProfiles.publicProfiles[username];
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  },

  getStats: async () => {
    await delay(200);
    return mockStats;
  },

  updateProfile: async (updates) => {
    await delay(500);
    return { ...mockProfiles.currentUser, ...updates };
  },
};
