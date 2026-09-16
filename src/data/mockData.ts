import { BuyerOrder, BatchRecord, FieldPicker, FieldSupervisorStats, RiskAlert, AIScenario } from '../types';

export const mockBuyerOrders: BuyerOrder[] = [
  {
    id: 'ORD-8821',
    buyer: 'FreshMart Supermarket',
    buyerType: 'Supermarket Chain',
    product: 'Strawberry',
    variety: 'Albion Premium',
    requiredQuantity: 350,
    allocatedQuantity: 350,
    unit: 'kg',
    status: 'Allocated',
    deliveryDate: 'Today, 14:00',
    targetGrade: 'Grade A',
    contractValue: 2800,
    coldChainReq: '2°C – 4°C'
  },
  {
    id: 'ORD-8822',
    buyer: 'Organica Club',
    buyerType: 'Artisan Grocer',
    product: 'Baby Spinach',
    variety: 'Savoy Leaf',
    requiredQuantity: 200,
    allocatedQuantity: 200,
    unit: 'kg',
    status: 'Allocated',
    deliveryDate: 'Today, 15:30',
    targetGrade: 'Grade A',
    contractValue: 1450,
    coldChainReq: '1°C – 3°C'
  },
  {
    id: 'ORD-8823',
    buyer: 'Metro Fresh Wholesale',
    buyerType: 'Wholesale Hub',
    product: 'Hass Avocado',
    variety: 'Hass Size 48',
    requiredQuantity: 800,
    allocatedQuantity: 680,
    unit: 'kg',
    status: 'Shortage Risk',
    deliveryDate: 'Today, 17:00',
    targetGrade: 'Grade A',
    contractValue: 4960,
    coldChainReq: '5°C – 7°C'
  },
  {
    id: 'ORD-8824',
    buyer: "Chef's Table Group",
    buyerType: 'Hospitality / Foodservice',
    product: 'Heirloom Tomatoes',
    variety: 'Brandywine Red',
    requiredQuantity: 120,
    allocatedQuantity: 120,
    unit: 'kg',
    status: 'On Track',
    deliveryDate: 'Today, 13:00',
    targetGrade: 'Grade A',
    contractValue: 1080,
    coldChainReq: '10°C – 12°C'
  },
  {
    id: 'ORD-8825',
    buyer: 'GreenValley Foods',
    buyerType: 'Supermarket Chain',
    product: 'Roma Tomatoes',
    variety: 'Plum San Marzano',
    requiredQuantity: 500,
    allocatedQuantity: 470,
    unit: 'kg',
    status: 'Pending Dispatch',
    deliveryDate: 'Today, 18:30',
    targetGrade: 'Grade B',
    contractValue: 2350,
    coldChainReq: '8°C – 11°C'
  },
  {
    id: 'ORD-8826',
    buyer: 'Pacific Natural Grocers',
    buyerType: 'Artisan Grocer',
    product: 'Blueberries',
    variety: 'Duke Highbush',
    requiredQuantity: 300,
    allocatedQuantity: 300,
    unit: 'kg',
    status: 'Allocated',
    deliveryDate: 'Today, 16:15',
    targetGrade: 'Grade A',
    contractValue: 3600,
    coldChainReq: '1°C – 3°C'
  }
];

export const mockBatches: BatchRecord[] = [
  {
    id: 'batch-01',
    batchCode: 'BATCH-2026-SB-094',
    product: 'Strawberry',
    variety: 'Albion Select',
    origin: 'Sunny Valley Farms',
    fieldBlock: 'Block 4A (Row 12–28)',
    harvestTime: '06:15 AM PST Today',
    weight: 1240,
    grade: 'Grade A',
    status: 'QC Passed',
    pulpTemp: 3.6,
    brix: 8.9,
    firmness: 4.8,
    supervisor: 'Mateo Ortiz',
    certifications: ['GlobalG.A.P. IFA v6', 'FSMA 204 Rule', 'USDA Organic'],
    shelfLifeDaysLeft: 7,
    coldChainData: [
      { time: '06:30', temp: 16.2, target: 4.0 },
      { time: '07:00', temp: 11.4, target: 4.0 },
      { time: '07:30', temp: 6.8, target: 4.0 },
      { time: '08:00', temp: 4.2, target: 4.0 },
      { time: '08:30', temp: 3.7, target: 4.0 },
      { time: '09:00', temp: 3.6, target: 4.0 },
    ]
  },
  {
    id: 'batch-02',
    batchCode: 'BATCH-2026-AV-102',
    product: 'Hass Avocado',
    variety: 'Hass 48 Count',
    origin: 'Ridge Vista Ranch',
    fieldBlock: 'South Slope Sector 2',
    harvestTime: '07:45 AM PST Today',
    weight: 2150,
    grade: 'Grade A',
    status: 'Pre-cooling',
    pulpTemp: 5.8,
    brix: 6.2,
    firmness: 7.4,
    supervisor: 'Elena Cruz',
    certifications: ['GlobalG.A.P.', 'Rainforest Alliance', 'FSMA 204'],
    shelfLifeDaysLeft: 12,
    coldChainData: [
      { time: '07:45', temp: 19.5, target: 6.0 },
      { time: '08:15', temp: 13.1, target: 6.0 },
      { time: '08:45', temp: 8.4, target: 6.0 },
      { time: '09:15', temp: 6.2, target: 6.0 },
      { time: '09:30', temp: 5.8, target: 6.0 },
    ]
  },
  {
    id: 'batch-03',
    batchCode: 'BATCH-2026-TM-088',
    product: 'Heirloom Tomato',
    variety: 'Brandywine Red',
    origin: 'Evergreen Greenhouse',
    fieldBlock: 'Greenhouse Bay 3',
    harvestTime: '08:30 AM PST Today',
    weight: 780,
    grade: 'Grade B',
    status: 'Graded',
    pulpTemp: 10.4,
    brix: 7.1,
    firmness: 5.2,
    supervisor: 'David Chen',
    certifications: ['USDA Organic', 'Non-GMO Project', 'FSMA 204'],
    shelfLifeDaysLeft: 6,
    coldChainData: [
      { time: '08:30', temp: 18.0, target: 11.0 },
      { time: '09:00', temp: 13.5, target: 11.0 },
      { time: '09:30', temp: 10.4, target: 11.0 },
    ]
  },
  {
    id: 'batch-04',
    batchCode: 'BATCH-2026-SP-041',
    product: 'Baby Spinach',
    variety: 'Savoy Crisp',
    origin: 'Crestline Hydroponics',
    fieldBlock: 'Hydro Bay East',
    harvestTime: '05:20 AM PST Today',
    weight: 450,
    grade: 'Grade A',
    status: 'Dispatch Ready',
    pulpTemp: 2.1,
    brix: 4.8,
    firmness: 3.5,
    supervisor: 'Sarah Jenkins',
    certifications: ['SQF Level 3', 'USDA Organic', 'FSMA 204'],
    shelfLifeDaysLeft: 9,
    coldChainData: [
      { time: '05:30', temp: 12.0, target: 2.0 },
      { time: '06:00', temp: 5.5, target: 2.0 },
      { time: '06:30', temp: 2.6, target: 2.0 },
      { time: '07:00', temp: 2.1, target: 2.0 },
      { time: '08:00', temp: 2.1, target: 2.0 },
    ]
  }
];

export const mockRiskAlerts: RiskAlert[] = [
  {
    id: 'risk-01',
    type: 'Shortage Risk',
    severity: 'critical',
    title: 'Avocado Allocation Deficit (120kg)',
    description: 'Metro Fresh order requires 800kg. Current yield in Sector 2 is 680kg due to morning rain delay.',
    impact: 'Potential $744 penalty & 15% fill-rate deduction',
    timestamp: '12 mins ago',
    recommendedAction: 'Trigger AI Surplus Decision: Reallocate from secondary reserve hub.'
  },
  {
    id: 'risk-02',
    type: 'Delivery Delay',
    severity: 'warning',
    title: 'Cold-Chain Van #04 Highway 101 Congestion',
    description: 'FreshMart consignment ETA shifted +32 mins. Estimated arrival 14:32 (SLA limit 14:45).',
    impact: 'Pulp temp holding steady at 3.4°C. Active monitor engaged.',
    timestamp: '28 mins ago',
    recommendedAction: 'Priority gate clearance token pre-transmitted to FreshMart intake dock.'
  },
  {
    id: 'risk-03',
    type: 'Quality Risk',
    severity: 'warning',
    title: 'Micro-Bruising Detected in Sector 4B',
    description: 'Optical scanner flagged 4.2% micro-bruising risk on Albion Strawberry batch row 14 due to early fog.',
    impact: 'Grade A conversion rate dropped from 86% to 79%.',
    timestamp: '41 mins ago',
    recommendedAction: 'Auto-reroute affected 35kg to secondary value stream via AI Decision Room.'
  }
];

export const mockPickers: FieldPicker[] = [
  {
    id: 'p-1',
    name: 'Marco Silva',
    zone: 'Sector 4A - Rows 1-8',
    product: 'Strawberry Albion',
    harvestedKg: 218,
    targetKg: 250,
    cratesPerHour: 14.2,
    qualityPassingRate: 98.4,
    status: 'Active'
  },
  {
    id: 'p-2',
    name: 'Elena Rostova',
    zone: 'Sector 4A - Rows 9-16',
    product: 'Strawberry Albion',
    harvestedKg: 194,
    targetKg: 250,
    cratesPerHour: 12.8,
    qualityPassingRate: 97.1,
    status: 'Active'
  },
  {
    id: 'p-3',
    name: 'David Kim',
    zone: 'Sector 4B - Rows 17-24',
    product: 'Strawberry Albion',
    harvestedKg: 172,
    targetKg: 250,
    cratesPerHour: 11.5,
    qualityPassingRate: 94.2,
    status: 'QC Inspection'
  },
  {
    id: 'p-4',
    name: 'Sofia Morales',
    zone: 'South Slope - Sector 2',
    product: 'Hass Avocado',
    harvestedKg: 310,
    targetKg: 380,
    cratesPerHour: 16.0,
    qualityPassingRate: 99.1,
    status: 'Active'
  },
  {
    id: 'p-5',
    name: 'Mateo Torres',
    zone: 'Bay 3 - Greenhouse',
    product: 'Heirloom Tomato',
    harvestedKg: 145,
    targetKg: 180,
    cratesPerHour: 10.4,
    qualityPassingRate: 96.5,
    status: 'Break'
  }
];

export const mockFieldSupervisorStats: FieldSupervisorStats = {
  targetQuantity: 5000,
  harvestedQuantity: 3740,
  progressPercentage: 74.8,
  activePickersCount: 28,
  openFieldAlerts: 1,
  ambientTemp: 19.4,
  relativeHumidity: 68
};

export const mockQCSummary = [
  { name: 'Grade A', value: 82, color: '#10b981', count: '3,066 kg', desc: 'Premium retail specification' },
  { name: 'Grade B', value: 12, color: '#f59e0b', count: '448 kg', desc: 'Secondary retail / food service' },
  { name: 'Processing', value: 4, color: '#6366f1', count: '150 kg', desc: 'Puree, freeze-dry, juicing' },
  { name: 'Reject', value: 2, color: '#ef4444', count: '76 kg', desc: 'Bio-compost conversion' }
];

export const mockDemandVsSupply = [
  { time: '06:00', demand: 1200, actualHarvest: 600, allocated: 600 },
  { time: '08:00', demand: 2400, actualHarvest: 1850, allocated: 1800 },
  { time: '10:00', demand: 3600, actualHarvest: 3200, allocated: 3150 },
  { time: '12:00', demand: 4200, actualHarvest: 4100, allocated: 3950 },
  { time: '14:00', demand: 4850, actualHarvest: 4620, allocated: 4500 },
  { time: '16:00', demand: 4850, actualHarvest: 4900, allocated: 4850 },
];

export const mockHarvestProgressByHour = [
  { hour: '06:00', harvested: 420, target: 500 },
  { hour: '07:00', harvested: 680, target: 650 },
  { hour: '08:00', harvested: 790, target: 750 },
  { hour: '09:00', harvested: 850, target: 800 },
  { hour: '10:00', harvested: 520, target: 700 }, // Rain delay dip
  { hour: '11:00', harvested: 480, target: 600 },
];

export const mockAIScenarios: AIScenario[] = [
  {
    id: 'sc-1',
    title: '35kg Strawberry surplus detected',
    badge: 'Real-Time Surplus Event',
    product: 'Albion Strawberry',
    quantityStr: '35 kg',
    rawQuantityKg: 35,
    batchSource: 'Packhouse 2 • Line C (Batch #SB-094)',
    detectionTime: 'Today at 09:14 AM',
    freshnessWindowHours: 36,
    riskBaseline: 'Unallocated produce drops 18% in commercial value every 12 hours without pre-cooling dispatch.',
    options: [
      {
        id: 'opt-1',
        optionNumber: 1,
        title: 'Process into Freeze-Dried Puree',
        category: 'Process',
        destination: 'AgriExtracts Co-Packing Hub',
        revenueRecovered: 280,
        freshnessScore: 88,
        wasteReductionKg: 35,
        co2SavingsKg: 64,
        confidenceScore: 89,
        isRecommended: false,
        logisticsSpeed: 'Transport in 6h',
        description: 'Converts perishable fruit into stable shelf-life ingredients. Covers cost of harvest + 22% net margin.'
      },
      {
        id: 'opt-2',
        optionNumber: 2,
        title: 'Redirect to Secondary Buyer (Artisan Bakery Network)',
        category: 'Redirect',
        destination: 'Le Petit Boulangerie & 3 Regional Patisseries',
        revenueRecovered: 410,
        freshnessScore: 96,
        wasteReductionKg: 35,
        co2SavingsKg: 82,
        confidenceScore: 96,
        isRecommended: true,
        logisticsSpeed: 'Same-day Dispatch (1.5h)',
        description: 'Matches exact sweet-acid profile (Brix 8.9) with morning artisan pastry demand. Yields highest net cash realization.'
      },
      {
        id: 'opt-3',
        optionNumber: 3,
        title: 'Discount Flash Sale via Retail App',
        category: 'Discount',
        destination: 'FreshMart "Blemish & Sweet" Flash Bin',
        revenueRecovered: 190,
        freshnessScore: 74,
        wasteReductionKg: 35,
        co2SavingsKg: 45,
        confidenceScore: 82,
        isRecommended: false,
        logisticsSpeed: 'Co-pack with primary order',
        description: 'Bundles onto truck already headed to FreshMart. Lowest logistics overhead, but realizes lower margin per kilogram.'
      }
    ]
  },
  {
    id: 'sc-2',
    title: '120kg Hass Avocado shortage detected',
    badge: 'Harvest Deficit Event',
    product: 'Hass Avocado',
    quantityStr: '120 kg',
    rawQuantityKg: 120,
    batchSource: 'Sector 2 (Rain delay on slope)',
    detectionTime: 'Today at 08:45 AM',
    freshnessWindowHours: 72,
    riskBaseline: 'Contract penalty of $744 applies if Metro Fresh fulfillment rate is beneath 95%.',
    options: [
      {
        id: 'opt-2-1',
        optionNumber: 1,
        title: 'Cross-Dock Reallocation from Wholesale Reserve Pool',
        category: 'Redirect',
        destination: 'Metro Fresh Dedicated Dock 4',
        revenueRecovered: 744,
        freshnessScore: 94,
        wasteReductionKg: 120,
        co2SavingsKg: 110,
        confidenceScore: 98,
        isRecommended: true,
        logisticsSpeed: 'Internal Hub Transfer (45 min)',
        description: 'Draws from uncommitted Grade A buffer in Central Pre-cool Facility. Avoids buyer SLA breach and penalty.'
      },
      {
        id: 'opt-2-2',
        optionNumber: 2,
        title: 'Split Order Fulfillment with Afternoon Harvest Run',
        category: 'Process',
        destination: 'Metro Fresh Secondary Route',
        revenueRecovered: 580,
        freshnessScore: 89,
        wasteReductionKg: 120,
        co2SavingsKg: 65,
        confidenceScore: 86,
        isRecommended: false,
        logisticsSpeed: 'Afternoon Run (4h delay)',
        description: 'Fulfills 680kg now and commits remaining 120kg on 16:30 truck. Incurs small secondary freight cost.'
      },
      {
        id: 'opt-2-3',
        optionNumber: 3,
        title: 'Substitute with Grade A Jumbo 40 Count with 5% Credit',
        category: 'Discount',
        destination: 'Metro Fresh Acceptance Desk',
        revenueRecovered: 490,
        freshnessScore: 95,
        wasteReductionKg: 120,
        co2SavingsKg: 70,
        confidenceScore: 81,
        isRecommended: false,
        logisticsSpeed: 'Immediate Release',
        description: 'Proposes larger fruit caliber currently in surplus with an automated digital buyer waiver.'
      }
    ]
  }
];
