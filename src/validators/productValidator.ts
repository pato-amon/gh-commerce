export function validateProductName(name: unknown) {
    if (typeof name !== "string" || name.trim() === "") {
        return "Name cannot be a number or empty";
    }

    return null;
}

export function validateProductPrice(price: unknown) {
    if (typeof price !== "number") {
        return "Price must be a number";
    }

    if (price <= 0) {
        return "Price must be greater than 0";
    }

    return null;
}