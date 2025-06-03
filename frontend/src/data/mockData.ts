import { User, ChatRoom, Message } from '../types/index';
import { format, subDays, subHours, subMinutes } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Valérie Herinantenaina',
    avatar: 'https://i.pinimg.com/736x/62/67/5b/62675bbafb119acbab1037b5399f5c78.jpg',
    email: 'herinantenaina.m@zurcher.edu.mg',
    role: 'student',
    department: 'Business',
    status: 'online',
    lastActive: new Date().toISOString(),
  },
  {
    id: 'u2',
    name: 'Rakoto',
    avatar: 'https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg',
    email: 'rakoto@zurcher.edu.mg',
    role: 'faculty',
    department: 'Engineering',
    status: 'online',
    lastActive: new Date().toISOString(),
  },
  // autres utilisateurs...
];

// Current User
export const currentUser: User = {
  id: 'current',
  name: 'Andréa Ranaivoson',
  avatar: 'https://i.pinimg.com/736x/62/67/5b/62675bbafb119acbab1037b5399f5c78.jpg',
  email: 'ranaivoson.i@zurcher.edu.mg',
  role: 'student',
  department: 'Computer Science',
  status: 'online',
  lastActive: new Date().toISOString(),
};

// Create mock messages
export const createMockMessages = (users: User[]): Message[] => ([
  {
    id: 'm1',
    content: "Hey tout le monde ! Est-ce que quelqu’un a déjà commencé à travailler sur le projet ?",
    sender: users[0],
    receiver: users[2],
    timestamp: subDays(new Date(), 1).toISOString(),
    isRead: true,
  },
  // autres messages...
]);

// Utilisation unique
const messagesRoom2 = createMockMessages(mockUsers);

// Exemple de salle de discussion corrigée
export const mockChatRooms: ChatRoom[] = [
  {
    id: 'cr1',
    name: "Département de l'informatique",
    type: 'channel',
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[4], currentUser],
    messages: messagesRoom2.slice(0, 5),
    unreadCount: 0,
    lastMessage: messagesRoom2[4],
    description: "Chaîne officielle pour les annonces et discussions du département informatique",
    createdAt: subDays(new Date(), 30).toISOString(),
    isStarred: true,
  },
  // autres chat rooms...
];
