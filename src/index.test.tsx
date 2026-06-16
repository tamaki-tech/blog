import { describe, expect, it, vi } from 'vitest'
import app from './index'

vi.mock('./lib/laprasClient', () => ({
  laprasClient: {
    fetchProfileModel: vi.fn(async () => null),
  },
}))

vi.mock('./lib/careerProfileClient', () => ({
  careerProfileClient: {
    fetchProfileModel: vi.fn(async () => null),
  },
}))

describe('routes', () => {
  it.each([
    { path: '/', expectedText: 'About Me' },
    { path: '/profile', expectedText: 'Profile' },
    { path: '/events', expectedText: 'Events' },
    { path: '/articles', expectedText: 'Articles' }
  ])('renders $path', async ({ path, expectedText }) => {
    const response = await app.request(path)

    expect(response.status).toBe(200)
    await expect(response.text()).resolves.toContain(expectedText)
  })
})
