import { createMocks } from 'node-mocks-http';
import { POST, GET } from '../src/app/api/event/userEvents/route';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    join: {
      findUnique: jest.fn(),
    },
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

jest.mock('@/lib/auth', () => ({
  getAuthSession: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => {
      return {
        status: init.status,
        json: async () => data,
      };
    }),
  },
}));

const { getAuthSession } = require('@/lib/auth');
const { PrismaClient } = require('@prisma/client');
const { NextResponse } = require('next/server');
const prisma = new PrismaClient();

describe('Event API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /events', () => {
    it('should return 403 if the user is not authenticated', async () => {
      getAuthSession.mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          groupId: 1,
          title: 'Test Event',
          description: 'This is a test event',
          location: 'Test Location',
          startDate: '2024-06-28T07:46:37.051Z',
          endDate: '2024-06-29T07:46:37.051Z',
          status: 'active',
          limitSubscriptionDate: '2024-06-27T07:46:37.051Z',
          address: '123 Test St',
          ville: 'Test City',
          CP: '12345',
          latitude: 12.34,
          longitude: 56.78,
        },
      });

      const response = await POST(req, res);

      expect(response.status).toBe(403);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Not Authenticated' },
        { status: 403 }
      );

      const jsonResponse = await response.json();
      expect(jsonResponse).toMatchObject({ message: 'Not Authenticated' });
    });
  });

  describe('GET /events', () => {
    it('should get all events for authenticated user', async () => {
      getAuthSession.mockResolvedValue({ user: { id: 1 } });
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        userGroups: [
          {
            group: {
              events: [
                { eventId: 1, title: 'Group Event 1' },
                { eventId: 2, title: 'Group Event 2' },
              ],
            },
          },
        ],
      });
      prisma.event.findMany.mockResolvedValue([
        { eventId: 3, title: 'Global Event 1' },
        { eventId: 4, title: 'Global Event 2' },
      ]);

      const { req, res } = createMocks({
        method: 'GET',
      });

      const response = await GET(req, res);

      expect(response.status).toBe(200);
      expect(NextResponse.json).toHaveBeenCalledWith(
        [
          { eventId: 1, title: 'Group Event 1' },
          { eventId: 2, title: 'Group Event 2' },
          { eventId: 3, title: 'Global Event 1' },
          { eventId: 4, title: 'Global Event 2' },
        ],
        { status: 200 }
      );

      const jsonResponse = await response.json();
      expect(jsonResponse).toMatchObject([
        { eventId: 1, title: 'Group Event 1' },
        { eventId: 2, title: 'Group Event 2' },
        { eventId: 3, title: 'Global Event 1' },
        { eventId: 4, title: 'Global Event 2' },
      ]);
    });

    it('should return 403 if the user is not authenticated', async () => {
      getAuthSession.mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'GET',
      });

      const response = await GET(req, res);

      expect(response.status).toBe(403);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Not Authenticated' },
        { status: 403 }
      );

      const jsonResponse = await response.json();
      expect(jsonResponse).toMatchObject({ message: 'Not Authenticated' });
    });
  });
});
