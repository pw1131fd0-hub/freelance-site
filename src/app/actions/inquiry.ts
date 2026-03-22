"use server";

import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { getServerSession } from "next-auth/next";
import { InquirySchema, type InquiryData } from "../../lib/schemas";

async function checkAuth() {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function submitInquiry(data: InquiryData) {
  // Public action, no auth needed
  try {
    const validated = InquirySchema.parse(data);

    // 1. 查找或建立客戶
    let customer = await prisma.customer.findUnique({
      where: { email: validated.email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: validated.name,
          email: validated.email,
        },
      });
    }

    // 2. 建立詢問單
    const inquiry = await prisma.inquiry.create({
      data: {
        description: validated.description,
        budget: validated.budget,
        projectType: validated.projectType,
        priority: validated.priority || "P2",
        customerId: customer.id,
        status: "PENDING",
      },
    });

    revalidatePath("/admin");
    return { success: true, id: inquiry.id };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "提交失敗，請稍後再試" };
  }
}

export async function getInquiries(status?: string) {
  try {
    await checkAuth();
    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: inquiries };
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return { success: false, data: [] };
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    await checkAuth();
    await prisma.inquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update inquiry status:", error);
    return { success: false };
  }
}

export async function getDashboardStats() {
  try {
    await checkAuth();
    const totalInquiries = await prisma.inquiry.count();
    const pendingInquiries = await prisma.inquiry.count({
      where: { status: "PENDING" },
    });
    const signedInquiries = await prisma.inquiry.count({
      where: { status: "SIGNED" },
    });

    return {
      success: true,
      data: {
        totalInquiries,
        pendingInquiries,
        signedInquiries,
        conversionRate: totalInquiries > 0 ? (signedInquiries / totalInquiries) * 100 : 0,
      }
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}

export async function getCustomers() {
  try {
    await checkAuth();
    const customers = await prisma.customer.findMany({
      include: {
        inquiries: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return { success: true, data: customers };
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return { success: false, data: [] };
  }
}

export async function getCustomerDetails(id: string) {
  try {
    await checkAuth();
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        inquiries: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return { success: true, data: customer };
  } catch (error) {
    console.error("Failed to fetch customer details:", error);
    return { success: false, data: null };
  }
}
