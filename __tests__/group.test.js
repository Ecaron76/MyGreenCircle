import { createMocks } from 'node-mocks-http';
import { POST, GET, DELETE } from '../src/app/api/groupe/route';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    group: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    join: {
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

jest.mock('@/lib/auth', () => ({
  getAuthSession: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init.status,
      json: async () => data,
    })),
  },
}));

const { getAuthSession } = require('@/lib/auth');
const { PrismaClient } = require('@prisma/client');
const { NextResponse } = require('next/server');
const prisma = new PrismaClient();

describe('Group API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /group', () => {
    it('should return 403 if the user is not authenticated', async () => {
      getAuthSession.mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          groupName: 'Test Group',
          groupDescription: 'This is a test group',
          groupLocation: 'Test Location',
          groupImage: 'test.jpg',
        },
      });

      await POST(req, res);

      expect(res._getStatusCode()).toBe(403);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Not Authenticated' },
        { status: 403 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject({ message: 'Not Authenticated' });
    });

    it('should create a group and a join entry if the user is authenticated', async () => {
      getAuthSession.mockResolvedValue({ user: { id: 1 } });
      prisma.group.create.mockResolvedValue({
        groupId: 1,
        groupName: 'Test Group',
        groupDescription: 'This is a test group',
        groupLocation: 'Test Location',
        groupImage: 'test.jpg',
      });
      prisma.join.create.mockResolvedValue({
        userId: 1,
        groupId: 1,
        role: 'admin',
        isAccepted: true,
        joiningDate: new Date(),
      });

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          groupName: 'Test Group',
          groupDescription: 'This is a test group',
          groupLocation: 'Test Location',
          groupImage: 'test.jpg',
        },
      });

      await POST(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          group: {
            groupId: 1,
            groupName: 'Test Group',
            groupDescription: 'This is a test group',
            groupLocation: 'Test Location',
            groupImage: 'test.jpg',
          },
          join: {
            userId: 1,
            groupId: 1,
            role: 'admin',
            isAccepted: true,
            joiningDate: expect.any(Date),
          },
        },
        { status: 200 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject({
        group: {
          groupId: 1,
          groupName: 'Test Group',
          groupDescription: 'This is a test group',
          groupLocation: 'Test Location',
          groupImage: 'test.jpg',
        },
        join: {
          userId: 1,
          groupId: 1,
          role: 'admin',
          isAccepted: true,
          joiningDate: expect.any(Date),
        },
      });
    });

    it('should handle unexpected errors gracefully', async () => {
      getAuthSession.mockResolvedValue({ user: { id: 1 } });
      prisma.group.create.mockRejectedValue(new Error('Database Error'));

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          groupName: 'Test Group',
          groupDescription: 'This is a test group',
          groupLocation: 'Test Location',
          groupImage: 'test.jpg',
        },
      });

      await POST(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Something went wrong' },
        { status: 500 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject({ message: 'Something went wrong' });
    });
  });

  describe('GET /group', () => {
    it('should return 403 if the user is not authenticated', async () => {
      getAuthSession.mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'GET',
      });

      await GET(req, res);

      expect(res._getStatusCode()).toBe(403);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Not Authenticated' },
        { status: 403 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject({ message: 'Not Authenticated' });
    });

    it('should return all groups if the user is authenticated', async () => {
      getAuthSession.mockResolvedValue({ user: { id: 1 } });
      prisma.group.findMany.mockResolvedValue([
        {
          groupId: 1,
          groupName: 'Test Group 1',
          groupDescription: 'This is test group 1',
          groupLocation: 'Test Location 1',
          groupImage: 'test1.jpg',
        },
        {
          groupId: 2,
          groupName: 'Test Group 2',
          groupDescription: 'This is test group 2',
          groupLocation: 'Test Location 2',
          groupImage: 'test2.jpg',
        },
      ]);

      const { req, res } = createMocks({
        method: 'GET',
      });

      await GET(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(NextResponse.json).toHaveBeenCalledWith(
        [
          {
            groupId: 1,
            groupName: 'Test Group 1',
            groupDescription: 'This is test group 1',
            groupLocation: 'Test Location 1',
            groupImage: 'test1.jpg',
          },
          {
            groupId: 2,
            groupName: 'Test Group 2',
            groupDescription: 'This is test group 2',
            groupLocation: 'Test Location 2',
            groupImage: 'test2.jpg',
          },
        ],
        { status: 200 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject([
        {
          groupId: 1,
          groupName: 'Test Group 1',
          groupDescription: 'This is test group 1',
          groupLocation: 'Test Location 1',
          groupImage: 'test1.jpg',
        },
        {
          groupId: 2,
          groupName: 'Test Group 2',
          groupDescription: 'This is test group 2',
          groupLocation: 'Test Location 2',
          groupImage: 'test2.jpg',
        },
      ]);
    });

    it('should handle unexpected errors gracefully', async () => {
      getAuthSession.mockResolvedValue({ user: { id: 1 } });
      prisma.group.findMany.mockRejectedValue(new Error('Database Error'));

      const { req, res } = createMocks({
        method: 'GET',
      });

      await GET(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Something went wrong' },
        { status: 500 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject({ message: 'Something went wrong' });
    });
  });

  describe('DELETE /group', () => {
    it('should return 403 if the user is not authenticated', async () => {
      getAuthSession.mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'DELETE',
        body: {
          groupId: 1,
        },
      });

      await DELETE(req, res);

      expect(res._getStatusCode()).toBe(403);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Not Authenticated' },
        { status: 403 }
      );

      const jsonResponse = await res._getJSONData();
      expect(jsonResponse).toMatchObject({ message: 'Not Authenticated' });
    });
  });
});
