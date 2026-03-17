import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const dbPath = 'prisma/dev.db'
const adapter = new PrismaBetterSqlite3({ url: dbPath })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clean DB
  await prisma.milestone.deleteMany({})
  await prisma.asset.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.client.deleteMany({})
  await prisma.inquiry.deleteMany({})
  await prisma.user.deleteMany({})

  const client1 = await prisma.client.create({
    data: {
      name: 'Acme Corp',
      email: 'contact@acme.corp',
      company: 'Acme Corp',
      projects: {
        create: [
          {
            title: 'Modern E-commerce Portal',
            description: 'Redesigning the shopping experience for 2026.',
            status: 'IN_PROGRESS',
            budget: 12000,
            milestones: {
              create: [
                { title: 'Discovery & UX', status: 'COMPLETED', order: 0 },
                { title: 'UI Design & Prototyping', status: 'COMPLETED', order: 1 },
                { title: 'Next.js Frontend Build', status: 'PENDING', order: 2 },
                { title: 'Payment Integration', status: 'PENDING', order: 3 },
              ]
            }
          }
        ]
      }
    }
  })

  const client2 = await prisma.client.create({
    data: {
      name: 'Globex Inc',
      email: 'ceo@globex.inc',
      company: 'Globex Inc',
      projects: {
        create: [
          {
            title: 'Internal Admin Dashboard',
            description: 'A new way to manage global assets.',
            status: 'DISCOVERY',
            budget: 8500,
            milestones: {
              create: [
                { title: 'Project Scoping', status: 'PENDING', order: 0 },
                { title: 'DB Schema Definition', status: 'PENDING', order: 1 },
              ]
            }
          }
        ]
      }
    }
  })

  await prisma.inquiry.createMany({
    data: [
      {
        name: 'Sara Designer',
        email: 'sara@pixel.com',
        projectType: 'Branding',
        budget: 4500,
        message: 'Looking for a new brand identity for my creative agency.',
        score: 65,
        status: 'NEW',
      },
      {
        name: 'Mark Venture',
        email: 'mark@vc.com',
        projectType: 'Web Development',
        budget: 15000,
        message: 'Need a high-performance landing page for our new crypto startup.',
        score: 95,
        status: 'QUALIFIED',
      },
      {
         name: 'Lisa Consultant',
         email: 'lisa@strategy.com',
         projectType: 'SEO & Strategy',
         budget: 3000,
         message: 'Can you help us improve our search ranking for 2026?',
         score: 40,
         status: 'REJECTED',
      }
    ]
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Adapter handles connection closing
  })
