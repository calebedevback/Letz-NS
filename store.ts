import { create } from 'zustand';
import { Place, User, CheckIn } from './types';
import { SP_PLACES, MOCK_USERS } from './data/seed';

interface AppState {
  user: User | null;
  places: Place[];
  users: User[];
  checkIns: CheckIn[];
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleCheckIn: (placeId: string) => void;
  getPlaceById: (id: string) => Place | undefined;
  getFriendsAtPlace: (placeId: string) => User[];
}

// Mock Simulation of Backend Logic within Store for Demo Purposes
export const useStore = create<AppState>((set, get) => ({
  user: null,
  places: SP_PLACES,
  users: MOCK_USERS,
  checkIns: [
    { userId: 'u2', placeId: 'p1', timestamp: Date.now() },
    { userId: 'u3', placeId: 'p1', timestamp: Date.now() },
    { userId: 'u4', placeId: 'p2', timestamp: Date.now() },
    { userId: 'u5', placeId: 'p6', timestamp: Date.now() },
  ],
  isLoading: false,

  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  toggleCheckIn: (placeId) => {
    const { user, checkIns, places } = get();
    if (!user) return;

    const isCheckedIn = checkIns.find(c => c.userId === user.uid && c.placeId === placeId);
    
    let newCheckIns;
    if (isCheckedIn) {
      // Check out
      newCheckIns = checkIns.filter(c => !(c.userId === user.uid && c.placeId === placeId));
    } else {
      // Check in (remove other checkins first)
      const cleanCheckIns = checkIns.filter(c => c.userId !== user.uid);
      newCheckIns = [...cleanCheckIns, { userId: user.uid, placeId, timestamp: Date.now() }];
    }

    // Update place counts locally to simulate realtime
    const newPlaces = places.map(p => {
      if (p.id === placeId) {
        return {
          ...p,
          currentCount: isCheckedIn ? p.currentCount - 1 : p.currentCount + 1
        };
      }
      // If checked out of another place to check in here
      const wasCheckedIn = checkIns.find(c => c.userId === user.uid && c.placeId === p.id);
      if (!isCheckedIn && wasCheckedIn) {
        return { ...p, currentCount: p.currentCount - 1 };
      }
      return p;
    });

    set({ checkIns: newCheckIns, places: newPlaces });
  },

  getPlaceById: (id) => get().places.find(p => p.id === id),
  
  getFriendsAtPlace: (placeId) => {
    const { checkIns, users } = get();
    // For demo, we assume everyone is a friend
    const userIdsAtPlace = checkIns
      .filter(c => c.placeId === placeId)
      .map(c => c.userId);
      
    return users.filter(u => userIdsAtPlace.includes(u.uid));
  }
}));