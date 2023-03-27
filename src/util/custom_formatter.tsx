class Utils {
    static sanitizePrice(priceString: string): number {
        const price = priceString.trim().split(' ')[0];
        return parseFloat(price);
    }
  }
  
  export default Utils;