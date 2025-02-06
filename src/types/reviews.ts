export interface Review {
  id: string;
  service_id: string;
  user_id: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  service: {
    title: string;
  };
  profiles: {
    full_name: string | null;
    email: string | null;
  };
  review_reports: {
    id: string;
    reason: string;
    status: "pending" | "resolved" | "dismissed";
    reporter: {
      full_name: string | null;
      email: string | null;
    };
  }[];
}