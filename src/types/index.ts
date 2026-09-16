export interface BuyerOrder {
  id: string;
  buyer: string;
  buyerType: 'Supermarket Chain' | 'Artisan Grocer' | 'Hospitality / Foodservice' | 'Wholesale Hub';
  product: string;
  variety: string;
  requiredQuantity: number;
  allocatedQuantity: number;
  unit: string;
  status: 'Allocated' | 'On Track' | 'Shortage Risk' | 'Pending Dispatch' | 'Delivered';
  deliveryDate: string;
  targetGrade: 'Grade A' | 'Grade B';
  contractValue: number;
  coldChainReq: string;
}

export interface BatchRecord {
  id: string;
  batchCode: string;
  product: string;
  variety: string;
  origin: string;
  fieldBlock: string;
  harvestTime: string;
  weight: number;
  grade: 'Grade A' | 'Grade B' | 'Processing' | 'Reject';
  status: 'Pre-cooling' | 'QC Passed' | 'Graded' | 'Dispatch Ready' | 'In Transit';
  pulpTemp: number; // in Celsius
  brix: number; // sugar content
  firmness: number; // pressure rating
  supervisor: string;
  certifications: string[];
  shelfLifeDaysLeft: number;
  coldChainData: { time: string; temp: number; target: number }[];
}

export interface FieldPicker {
  id: string;
  name: string;
  zone: string;
  product: string;
  harvestedKg: number;
  targetKg: number;
  cratesPerHour: number;
  qualityPassingRate: number;
  status: 'Active' | 'Break' | 'QC Inspection';
}

export interface FieldSupervisorStats {
  targetQuantity: number;
  harvestedQuantity: number;
  progressPercentage: number;
  activePickersCount: number;
  openFieldAlerts: number;
  ambientTemp: number;
  relativeHumidity: number;
}

export interface RiskAlert {
  id: string;
  type: 'Shortage Risk' | 'Delivery Delay' | 'Quality Risk';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
  timestamp: string;
  recommendedAction: string;
  resolved?: boolean;
}

export interface AIOption {
  id: string;
  optionNumber: 1 | 2 | 3;
  title: string;
  category: 'Process' | 'Redirect' | 'Discount';
  destination: string;
  revenueRecovered: number;
  freshnessScore: number;
  wasteReductionKg: number;
  co2SavingsKg: number;
  confidenceScore: number;
  isRecommended: boolean;
  logisticsSpeed: string;
  description: string;
}

export interface AIScenario {
  id: string;
  title: string;
  badge: string;
  product: string;
  quantityStr: string;
  rawQuantityKg: number;
  batchSource: string;
  detectionTime: string;
  freshnessWindowHours: number;
  riskBaseline: string;
  options: AIOption[];
}
