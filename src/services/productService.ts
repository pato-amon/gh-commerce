import prisma from "../prisma";

export async function getAllProducts() {
    return await prisma.products.findMany();
}

export async function getProductById(id: number) {
    return await prisma.products.findUnique({
        where: {
            id: id
        }
    });
}

export async function createProduct(name: string, price: number) {
    return prisma.products.create({
        data: {
            name, price
        }
    });
}

export async function updateProduct(
    id: number, data: { name?: string; price?: number }) {
    return await prisma.products.update({
        where: {
            id: id
        },
        data: data
    });
}

export async function deleteProduct(id: number) {
    return await prisma.products.delete({
        where: {
            id: id
        }
    });
}