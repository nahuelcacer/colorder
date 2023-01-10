function getTotalCost(items) {
    let totalCost = 0;
    for (let i = 0; i < items.length; i++) {
      totalCost += items[i].cantidad * items[i].producto.precio;
    }
    return totalCost;
  }
export default getTotalCost  