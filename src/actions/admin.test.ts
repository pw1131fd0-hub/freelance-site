import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  qualifyLead, 
  convertLead, 
  deleteInquiry, 
  updateMilestone, 
  updateProjectStatus, 
  deleteProject, 
  deleteClient, 
  createAsset, 
  deleteAsset 
} from './admin'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

vi.mock('@/lib/prisma', () => ({
  default: {
    inquiry: {
      update: vi.fn(),
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
    client: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    project: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    milestone: {
      update: vi.fn(),
    },
    asset: {
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Admin Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('qualifyLead', () => {
    it('should update inquiry status and revalidate path', async () => {
      await qualifyLead('inq-1', 'QUALIFIED')
      expect(prisma.inquiry.update).toHaveBeenCalledWith({
        where: { id: 'inq-1' },
        data: { status: 'QUALIFIED' }
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/crm')
    })
  })

  describe('convertLead', () => {
    it('should convert an inquiry to client and project', async () => {
      const mockInquiry = {
        id: 'inq-1',
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'Web Dev',
        message: 'Hello',
        budget: 5000,
      }
      ;(prisma.inquiry.findUnique as any).mockResolvedValue(mockInquiry)
      ;(prisma.client.findUnique as any).mockResolvedValue(null)
      ;(prisma.client.create as any).mockResolvedValue({ id: 'client-1' })
      ;(prisma.project.create as any).mockResolvedValue({ id: 'project-1' })

      const result = await convertLead('inq-1')

      expect(result.success).toBe(true)
      expect(prisma.client.create).toHaveBeenCalled()
      expect(prisma.project.create).toHaveBeenCalled()
      expect(prisma.inquiry.update).toHaveBeenCalledWith({
        where: { id: 'inq-1' },
        data: { status: 'CONVERTED' }
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects')
    })

    it('should use existing client if found', async () => {
      const mockInquiry = {
        id: 'inq-1',
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'Web Dev',
        message: 'Hello',
        budget: 5000,
      }
      ;(prisma.inquiry.findUnique as any).mockResolvedValue(mockInquiry)
      ;(prisma.client.findUnique as any).mockResolvedValue({ id: 'existing-client-1' })
      ;(prisma.project.create as any).mockResolvedValue({ id: 'project-1' })

      const result = await convertLead('inq-1')

      expect(result.success).toBe(true)
      expect(prisma.client.create).not.toHaveBeenCalled()
      expect(prisma.project.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ clientId: 'existing-client-1' })
      }))
    })

    it('should return error if conversion fails', async () => {
      ;(prisma.inquiry.findUnique as any).mockRejectedValue(new Error('DB Error'))
      const result = await convertLead('inq-1')
      expect(result.success).toBe(false)
      expect(result.error).toBe('Internal server error')
    })
  })

  describe('deleteInquiry', () => {
    it('should delete inquiry and revalidate', async () => {
      await deleteInquiry('inq-1')
      expect(prisma.inquiry.delete).toHaveBeenCalledWith({ where: { id: 'inq-1' } })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/crm')
    })

    it('should return error if delete fails', async () => {
      ;(prisma.inquiry.delete as any).mockRejectedValue(new Error('DB Error'))
      const result = await deleteInquiry('inq-1')
      expect(result.success).toBe(false)
    })
  })

  describe('updateMilestone', () => {
    it('should update milestone and revalidate', async () => {
      ;(prisma.milestone.update as any).mockResolvedValue({ id: 'm-1' })
      await updateMilestone('m-1', 'COMPLETED')
      expect(prisma.milestone.update).toHaveBeenCalledWith({
        where: { id: 'm-1' },
        data: { status: 'COMPLETED' }
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects')
    })

    it('should return error if update fails', async () => {
      ;(prisma.milestone.update as any).mockRejectedValue(new Error('DB Error'))
      const result = await updateMilestone('m-1', 'COMPLETED')
      expect(result.success).toBe(false)
    })
  })

  describe('updateProjectStatus', () => {
    it('should update project status and revalidate', async () => {
      await updateProjectStatus('p-1', 'IN_PROGRESS')
      expect(prisma.project.update).toHaveBeenCalledWith({
        where: { id: 'p-1' },
        data: { status: 'IN_PROGRESS' }
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects/p-1')
    })
  })

  describe('deleteProject', () => {
    it('should delete project and revalidate', async () => {
      await deleteProject('p-1')
      expect(prisma.project.delete).toHaveBeenCalledWith({ where: { id: 'p-1' } })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects')
    })
  })

  describe('deleteClient', () => {
    it('should delete client and revalidate', async () => {
      await deleteClient('c-1')
      expect(prisma.client.delete).toHaveBeenCalledWith({ where: { id: 'c-1' } })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/clients')
    })
  })

  describe('createAsset', () => {
    it('should create asset and revalidate', async () => {
      const data = { name: 'Logo', url: '/logo.png', type: 'IMAGE', projectId: 'p-1' }
      await createAsset(data)
      expect(prisma.asset.create).toHaveBeenCalledWith({ data })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/assets')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects/p-1')
    })
  })

  describe('deleteAsset', () => {
    it('should delete asset and revalidate', async () => {
      ;(prisma.asset.delete as any).mockResolvedValue({ projectId: 'p-1' })
      await deleteAsset('a-1')
      expect(prisma.asset.delete).toHaveBeenCalledWith({ where: { id: 'a-1' } })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/assets')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/projects/p-1')
    })
  })
})
