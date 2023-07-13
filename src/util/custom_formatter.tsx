class Utils {
    static sanitizePrice(priceString: string): number {
        const price = priceString.trim().split(' ')[0];
        return parseFloat(price);
    }

    static handleFromVendor(vendor: string): string {
        return vendor.replace(/ /g, '-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9-]/g, ' ')
    }

    // From shops, colors, categories, size, all lists of strings
    static makeShopifyQueryFromFilters(shops: string[], colors: string[], materials: string[], categories: string[], sizes: string[]): string {
        let queryString = "";

        // Add shop filter
        if (shops && shops.length > 0) {
        const shopFilter = shops.map((shop) => `(vendor:${shop})`).join(" OR ");
        queryString += `(${shopFilter})`;
        }

        // Add color filter
        if (colors && colors.length > 0) {
        const colorFilter = colors.map((color) => `(tag:${color})`).join(" OR ");
        queryString += ` AND ((${colorFilter}))`;
        }

        // Add category filter
        if (categories && categories.length > 0) {
        const categoryFilter = categories.map((category) => `(product_type:${category})`).join(" OR ");
        queryString += ` AND ((${categoryFilter}))`;
        }

        // Add size filter
        if (sizes && sizes.length > 0) {
        const sizeFilter = sizes.map((s) => `(tag:${s})`).join(" OR ");
        queryString += ` AND (${sizeFilter})`;
        }

        // Add material filter
        if (materials && materials.length > 0) {
            const sizeFilter = materials.map((s) => `(tag:${s})`).join(" OR ");
            queryString += ` AND (${sizeFilter})`;
        }

        return queryString
    }
  }
  
  export default Utils;