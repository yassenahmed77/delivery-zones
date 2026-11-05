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

export interface Store {
  id: string;
  name: string;
  slug: string;
  phone?: string | null;
  notes?: string | null;
  status: 'pending' | 'submitted';
  created_at: string;
  submitted_at?: string | null;
  submissions_count?: number;
}

export interface FormSubmission {
  storeId?: string;
  storeSlug?: string;
  restaurantName?: string;
  answers: MainAreaAnswer[];
  missingAreaNote?: string;
  submittedAt?: string;
}

// Admin submission row
export interface DbSubmission {
  id: string;
  store_id?: string | null;
  store_slug?: string | null;
  restaurant_name: string | null;
  answers: MainAreaAnswer[];
  missing_area_note: string | null;
  submitted_at: string;
  created_at: string;
}
