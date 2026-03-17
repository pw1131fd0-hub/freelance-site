'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function qualifyLead(id: string, status: string) {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/admin/crm')
    return { success: true }
  } catch (error) {
    console.error('Failed to qualify lead:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function convertLead(id: string) {
  try {
    const inquiry = await prisma.inquiry.findUnique({ where: { id } })
    if (!inquiry) return { success: false, error: 'Inquiry not found' }

    // Create client or find existing
    let client = await prisma.client.findUnique({ where: { email: inquiry.email } })
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: inquiry.name,
          email: inquiry.email,
        }
      })
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title: `${inquiry.projectType} for ${inquiry.name}`,
        description: inquiry.message,
        clientId: client.id,
        budget: inquiry.budget,
        status: 'DISCOVERY',
        milestones: {
          create: [
            { title: 'Discovery & Scoping', order: 0, status: 'PENDING' },
            { title: 'Initial Design', order: 1, status: 'PENDING' },
            { title: 'Final Delivery', order: 2, status: 'PENDING' },
          ]
        }
      }
    })

    // Update inquiry status
    await prisma.inquiry.update({
      where: { id },
      data: { status: 'CONVERTED' }
    })

    revalidatePath('/admin/crm')
    revalidatePath('/admin/projects')
    revalidatePath('/admin/dashboard')
    
    return { success: true, projectId: project.id }
  } catch (error) {
    console.error('Failed to convert lead:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteInquiry(id: string) {
  try {
    await prisma.inquiry.delete({ where: { id } })
    revalidatePath('/admin/crm')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete inquiry:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function updateMilestone(id: string, status: string) {
  try {
    const milestone = await prisma.milestone.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/admin/projects')
    return { success: true, milestone }
  } catch (error) {
    console.error('Failed to update milestone:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function updateProjectStatus(id: string, status: string) {
  try {
    await prisma.project.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/admin/projects')
    revalidatePath(`/admin/projects/${id}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to update project status:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete project:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({ where: { id } })
    revalidatePath('/admin/clients')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete client:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function createAsset(data: { name: string, url: string, type: string, projectId: string }) {
  try {
    const asset = await prisma.asset.create({ data })
    revalidatePath('/admin/assets')
    revalidatePath(`/admin/projects/${data.projectId}`)
    return { success: true, asset }
  } catch (error) {
    console.error('Failed to create asset:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteAsset(id: string) {
  try {
    const asset = await prisma.asset.delete({ where: { id } })
    revalidatePath('/admin/assets')
    revalidatePath(`/admin/projects/${asset.projectId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to delete asset:', error)
    return { success: false, error: 'Internal server error' }
  }
}


