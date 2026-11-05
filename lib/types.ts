// ============================================================
// Shared TypeScript types for the delivery coverage form
// ============================================================

export interface SubareaAnswer {
  subareaId: string;
  subareaNameAr: string;
  subareaNameEn: string;
  deliveryAvailable: boolean | null; // null = not yet answered
  deliveryFee?: number;
  estimatedTime?: number;
}

export interface MainAreaAnswer {
  mainAreaId: string;
  mainAreaNameAr: string;
  mainAreaNameEn: string;
  governorateId: string;
  governorateNameAr: string;
  governorateNameEn: string;
  generalDeliveryAvailable: boolean | null; // null = not yet answered
  subareas: SubareaAnswer[];
}

export interface FormSubmission {
  restaurantName?: string;
  answers: MainAreaAnswer[];
  missingAreaNote?: string;
  submittedAt?: string;
}

// Admin types
export interface DbSubmission {
  id: string;
  restaurant_name: string | null;
  answers: MainAreaAnswer[];
  missing_area_note: string | null;
  submitted_at: string;
  created_at: string;
}

