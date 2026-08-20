export const calculateOldRegimeTax = (gross: number, deductionsTotal: number) => {
  const stdDed = 50000;
  let taxable = Math.max(0, gross - stdDed - deductionsTotal);
  
  let tax = 0;
  if (taxable > 1000000) {
    tax += (taxable - 1000000) * 0.30;
    taxable = 1000000;
  }
  if (taxable > 500000) {
    tax += (taxable - 500000) * 0.20;
    taxable = 500000;
  }
  if (taxable > 250000) {
    tax += (taxable - 250000) * 0.05;
  }
  
  // Rebate 87A under old regime (up to 5L)
  if (gross - stdDed - deductionsTotal <= 500000) {
    tax = Math.max(0, tax - 12500);
  }
  
  const cess = tax * 0.04;
  return tax + cess;
};

export const calculateNewRegimeTax = (gross: number) => {
  const stdDed = 75000;
  let taxable = Math.max(0, gross - stdDed);
  const originalTaxable = taxable;
  
  let tax = 0;
  if (taxable > 2400000) { tax += (taxable - 2400000) * 0.30; taxable = 2400000; }
  if (taxable > 2000000) { tax += (taxable - 2000000) * 0.25; taxable = 2000000; }
  if (taxable > 1600000) { tax += (taxable - 1600000) * 0.20; taxable = 1600000; }
  if (taxable > 1200000) { tax += (taxable - 1200000) * 0.15; taxable = 1200000; }
  if (taxable > 800000) { tax += (taxable - 800000) * 0.10; taxable = 800000; }
  if (taxable > 400000) { tax += (taxable - 400000) * 0.05; }
  
  // Rebate up to 12L taxable income
  if (originalTaxable <= 1200000) {
    tax = Math.max(0, tax - 60000);
  }
  
  const cess = tax * 0.04;
  return tax + cess;
};
