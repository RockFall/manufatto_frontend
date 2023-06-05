class Utils {
    static sanitizePrice(priceString: string): number {
        const price = priceString.trim().split(' ')[0];
        return parseFloat(price);
    }

    static handleFromVendor(vendor: string): string {
        return vendor.replace(/ /g, '_').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }
  }
  
  export default Utils;