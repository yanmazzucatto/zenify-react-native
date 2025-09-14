// store/friendsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
}

interface FriendsState {
  users: User[];
  friends: Friendship[];
  searchResults: User[];
  isLoading: boolean;
  searchQuery: string;
  
  // Actions
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  searchUsers: (query: string) => void;
  sendFriendRequest: (friendId: string) => void;
  acceptFriendRequest: (friendshipId: string) => void;
  rejectFriendRequest: (friendshipId: string) => void;
  removeFriend: (friendshipId: string) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearSearchResults: () => void;
}

// Mock data para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@example.com',
    username: 'ana_silva',
    bio: 'Focada em produtividade e bem-estar',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    username: 'carlos_santos',
    bio: 'Desenvolvedor e entusiasta de mindfulness',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    username: 'maria_oliveira',
    bio: 'Coach de vida e meditação',
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    name: 'João Costa',
    email: 'joao@example.com',
    username: 'joao_costa',
    bio: 'Estudante de medicina e yoga',
    createdAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '5',
    name: 'Lucas Ferreira',
    email: 'lucas@example.com',
    username: 'lucas_ferreira',
    bio: 'Empreendedor e praticante de meditação',
    createdAt: '2024-02-15T11:20:00Z'
  }
];

export const useFriendsStore = create<FriendsState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      friends: [],
      searchResults: [],
      isLoading: false,
      searchQuery: '',

      setUsers: (users) => set({ users }),

      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),

      searchUsers: (query) => {
        set({ searchQuery: query, isLoading: true });
        
        // Simular delay de API
        setTimeout(() => {
          const { users, friends } = get();
          const currentUserId = 'current_user_id'; // Em uma app real, viria do auth store
          
          // Filtrar usuários que não são o usuário atual e não são já amigos
          const filteredUsers = users.filter(user => {
            const isNotCurrentUser = user.id !== currentUserId;
            const isNotAlreadyFriend = !friends.some(friendship => 
              (friendship.userId === currentUserId && friendship.friendId === user.id) ||
              (friendship.friendId === currentUserId && friendship.userId === user.id)
            );
            return isNotCurrentUser && isNotAlreadyFriend;
          });

          // Filtrar por query
          const results = query.length >= 2 
            ? filteredUsers.filter(user => 
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.username.toLowerCase().includes(query.toLowerCase())
              )
            : [];

          set({ 
            searchResults: results, 
            isLoading: false 
          });
        }, 500);
      },

      sendFriendRequest: (friendId) => {
        const newFriendship: Friendship = {
          id: `friendship_${Date.now()}`,
          userId: 'current_user_id', // Em uma app real, viria do auth store
          friendId,
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          friends: [...state.friends, newFriendship]
        }));
      },

      acceptFriendRequest: (friendshipId) => {
        set((state) => ({
          friends: state.friends.map(friendship =>
            friendship.id === friendshipId
              ? { ...friendship, status: 'accepted' as const }
              : friendship
          )
        }));
      },

      rejectFriendRequest: (friendshipId) => {
        set((state) => ({
          friends: state.friends.filter(friendship => friendship.id !== friendshipId)
        }));
      },

      removeFriend: (friendshipId) => {
        set((state) => ({
          friends: state.friends.filter(friendship => friendship.id !== friendshipId)
        }));
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      clearSearchResults: () => set({ 
        searchResults: [], 
        searchQuery: '' 
      }),
    }),
    {
      name: 'friends-storage',
      partialize: (state) => ({ 
        friends: state.friends,
        users: state.users 
      }),
    }
  )
);
