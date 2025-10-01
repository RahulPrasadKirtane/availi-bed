export interface Hospital {
  id: string;
  district: string;
  hospital_details: string;
  hospital_category: string;
  address: string;
  charges: string;
  free_regulated_beds: number;
  vacant_bed_isolation_without_oxygen: number;
  vacant_isolation_with_oxygen: number;
  vacant_bed_icu_without_ventilator: number;
  vacant_icu_beds_with_ventilator: number;
  latitude: number;
  longitude: number;
}

// Mock data simulating CSV import with geocoded coordinates
export const hospitalData: Hospital[] = [
  {
    id: "1",
    district: "Mumbai",
    hospital_details: "Lilavati Hospital and Research Centre",
    hospital_category: "Private",
    address: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050",
    charges: "Paid",
    free_regulated_beds: 450,
    vacant_bed_isolation_without_oxygen: 12,
    vacant_isolation_with_oxygen: 8,
    vacant_bed_icu_without_ventilator: 5,
    vacant_icu_beds_with_ventilator: 3,
    latitude: 19.0596,
    longitude: 72.8295
  },
  {
    id: "2",
    district: "Mumbai",
    hospital_details: "KEM Hospital",
    hospital_category: "Government",
    address: "489, Rasta Peth, Sardar Moodliar Road, Near Agripada Police Station, Mumbai, Maharashtra 400012",
    charges: "Free",
    free_regulated_beds: 800,
    vacant_bed_isolation_without_oxygen: 45,
    vacant_isolation_with_oxygen: 23,
    vacant_bed_icu_without_ventilator: 12,
    vacant_icu_beds_with_ventilator: 8,
    latitude: 18.9894,
    longitude: 72.8355
  },
  {
    id: "3",
    district: "Delhi",
    hospital_details: "AIIMS Delhi",
    hospital_category: "Government",
    address: "Ansari Nagar, New Delhi, Delhi 110029",
    charges: "Free",
    free_regulated_beds: 2500,
    vacant_bed_isolation_without_oxygen: 0,
    vacant_isolation_with_oxygen: 2,
    vacant_bed_icu_without_ventilator: 0,
    vacant_icu_beds_with_ventilator: 1,
    latitude: 28.5672,
    longitude: 77.2100
  },
  {
    id: "4",
    district: "Delhi",
    hospital_details: "Max Super Speciality Hospital",
    hospital_category: "Private",
    address: "1, Press Enclave Marg, Saket Institutional Area, Saket, New Delhi, Delhi 110017",
    charges: "Paid",
    free_regulated_beds: 550,
    vacant_bed_isolation_without_oxygen: 18,
    vacant_isolation_with_oxygen: 15,
    vacant_bed_icu_without_ventilator: 10,
    vacant_icu_beds_with_ventilator: 7,
    latitude: 28.5244,
    longitude: 77.2066
  },
  {
    id: "5",
    district: "Bangalore",
    hospital_details: "Manipal Hospital",
    hospital_category: "Private",
    address: "98, HAL Airport Road, Kodihalli, Bangalore, Karnataka 560017",
    charges: "Paid",
    free_regulated_beds: 650,
    vacant_bed_isolation_without_oxygen: 25,
    vacant_isolation_with_oxygen: 20,
    vacant_bed_icu_without_ventilator: 8,
    vacant_icu_beds_with_ventilator: 6,
    latitude: 12.9572,
    longitude: 77.6497
  },
  {
    id: "6",
    district: "Bangalore",
    hospital_details: "Victoria Hospital",
    hospital_category: "Government",
    address: "Fort Mohalla, Krishnarajendra Market, Bangalore, Karnataka 560002",
    charges: "Regulated",
    free_regulated_beds: 1200,
    vacant_bed_isolation_without_oxygen: 35,
    vacant_isolation_with_oxygen: 28,
    vacant_bed_icu_without_ventilator: 15,
    vacant_icu_beds_with_ventilator: 10,
    latitude: 12.9698,
    longitude: 77.5895
  },
  {
    id: "7",
    district: "Chennai",
    hospital_details: "Apollo Hospitals",
    hospital_category: "Private",
    address: "21, Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006",
    charges: "Paid",
    free_regulated_beds: 750,
    vacant_bed_isolation_without_oxygen: 30,
    vacant_isolation_with_oxygen: 22,
    vacant_bed_icu_without_ventilator: 12,
    vacant_icu_beds_with_ventilator: 9,
    latitude: 13.0569,
    longitude: 80.2491
  },
  {
    id: "8",
    district: "Chennai",
    hospital_details: "Government General Hospital",
    hospital_category: "Government",
    address: "EVR Periyar Salai, Park Town, Chennai, Tamil Nadu 600003",
    charges: "Free",
    free_regulated_beds: 2000,
    vacant_bed_isolation_without_oxygen: 55,
    vacant_isolation_with_oxygen: 40,
    vacant_bed_icu_without_ventilator: 18,
    vacant_icu_beds_with_ventilator: 12,
    latitude: 13.0843,
    longitude: 80.2809
  },
  {
    id: "9",
    district: "Kolkata",
    hospital_details: "AMRI Hospitals",
    hospital_category: "Private",
    address: "P-4 & 5, CIT Scheme LXXII, Gariahat Road, Dhakuria, Kolkata, West Bengal 700029",
    charges: "Paid",
    free_regulated_beds: 450,
    vacant_bed_isolation_without_oxygen: 8,
    vacant_isolation_with_oxygen: 5,
    vacant_bed_icu_without_ventilator: 3,
    vacant_icu_beds_with_ventilator: 2,
    latitude: 22.5154,
    longitude: 88.3640
  },
  {
    id: "10",
    district: "Kolkata",
    hospital_details: "SSKM Hospital",
    hospital_category: "Government",
    address: "244, AJC Bose Road, Bhowanipore, Kolkata, West Bengal 700020",
    charges: "Free",
    free_regulated_beds: 1800,
    vacant_bed_isolation_without_oxygen: 0,
    vacant_isolation_with_oxygen: 0,
    vacant_bed_icu_without_ventilator: 0,
    vacant_icu_beds_with_ventilator: 0,
    latitude: 22.5411,
    longitude: 88.3525
  },
  {
    id: "11",
    district: "Pune",
    hospital_details: "Ruby Hall Clinic",
    hospital_category: "Private",
    address: "40, Sassoon Road, Pune, Maharashtra 411001",
    charges: "Paid",
    free_regulated_beds: 550,
    vacant_bed_isolation_without_oxygen: 22,
    vacant_isolation_with_oxygen: 18,
    vacant_bed_icu_without_ventilator: 9,
    vacant_icu_beds_with_ventilator: 6,
    latitude: 18.5196,
    longitude: 73.8553
  },
  {
    id: "12",
    district: "Pune",
    hospital_details: "Sassoon General Hospital",
    hospital_category: "Government",
    address: "Near Pune Railway Station, Pune, Maharashtra 411001",
    charges: "Free",
    free_regulated_beds: 1400,
    vacant_bed_isolation_without_oxygen: 38,
    vacant_isolation_with_oxygen: 30,
    vacant_bed_icu_without_ventilator: 14,
    vacant_icu_beds_with_ventilator: 10,
    latitude: 18.5314,
    longitude: 73.8446
  },
  {
    id: "13",
    district: "Hyderabad",
    hospital_details: "Care Hospitals",
    hospital_category: "Private",
    address: "Road No. 1, Banjara Hills, Hyderabad, Telangana 500034",
    charges: "Paid",
    free_regulated_beds: 500,
    vacant_bed_isolation_without_oxygen: 15,
    vacant_isolation_with_oxygen: 12,
    vacant_bed_icu_without_ventilator: 7,
    vacant_icu_beds_with_ventilator: 5,
    latitude: 17.4239,
    longitude: 78.4738
  },
  {
    id: "14",
    district: "Hyderabad",
    hospital_details: "Osmania General Hospital",
    hospital_category: "Government",
    address: "Afzal Gunj, Hyderabad, Telangana 500012",
    charges: "Free",
    free_regulated_beds: 2200,
    vacant_bed_isolation_without_oxygen: 48,
    vacant_isolation_with_oxygen: 35,
    vacant_bed_icu_without_ventilator: 16,
    vacant_icu_beds_with_ventilator: 11,
    latitude: 17.3753,
    longitude: 78.4815
  },
  {
    id: "15",
    district: "Ahmedabad",
    hospital_details: "Sterling Hospital",
    hospital_category: "Private",
    address: "Off Gurukul Road, Behind Drive-In Cinema, Ahmedabad, Gujarat 380052",
    charges: "Paid",
    free_regulated_beds: 400,
    vacant_bed_isolation_without_oxygen: 10,
    vacant_isolation_with_oxygen: 8,
    vacant_bed_icu_without_ventilator: 4,
    vacant_icu_beds_with_ventilator: 3,
    latitude: 23.0395,
    longitude: 72.5204
  },
  {
    id: "16",
    district: "Ahmedabad",
    hospital_details: "Civil Hospital",
    hospital_category: "Government",
    address: "Asarwa, Ahmedabad, Gujarat 380016",
    charges: "Free",
    free_regulated_beds: 1600,
    vacant_bed_isolation_without_oxygen: 42,
    vacant_isolation_with_oxygen: 33,
    vacant_bed_icu_without_ventilator: 15,
    vacant_icu_beds_with_ventilator: 10,
    latitude: 23.0395,
    longitude: 72.5958
  },
  {
    id: "17",
    district: "Jaipur",
    hospital_details: "Fortis Escorts Hospital",
    hospital_category: "Private",
    address: "Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur, Rajasthan 302017",
    charges: "Paid",
    free_regulated_beds: 350,
    vacant_bed_isolation_without_oxygen: 12,
    vacant_isolation_with_oxygen: 9,
    vacant_bed_icu_without_ventilator: 5,
    vacant_icu_beds_with_ventilator: 4,
    latitude: 26.8621,
    longitude: 75.8095
  },
  {
    id: "18",
    district: "Jaipur",
    hospital_details: "SMS Hospital",
    hospital_category: "Government",
    address: "JLN Marg, Jaipur, Rajasthan 302004",
    charges: "Free",
    free_regulated_beds: 2800,
    vacant_bed_isolation_without_oxygen: 60,
    vacant_isolation_with_oxygen: 45,
    vacant_bed_icu_without_ventilator: 20,
    vacant_icu_beds_with_ventilator: 14,
    latitude: 26.9124,
    longitude: 75.7873
  },
  {
    id: "19",
    district: "Lucknow",
    hospital_details: "Sahara Hospital",
    hospital_category: "Private",
    address: "Viraj Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    charges: "Paid",
    free_regulated_beds: 300,
    vacant_bed_isolation_without_oxygen: 8,
    vacant_isolation_with_oxygen: 6,
    vacant_bed_icu_without_ventilator: 3,
    vacant_icu_beds_with_ventilator: 2,
    latitude: 26.8550,
    longitude: 80.9735
  },
  {
    id: "20",
    district: "Lucknow",
    hospital_details: "King George's Medical University",
    hospital_category: "Government",
    address: "Chowk, Lucknow, Uttar Pradesh 226003",
    charges: "Free",
    free_regulated_beds: 2400,
    vacant_bed_isolation_without_oxygen: 52,
    vacant_isolation_with_oxygen: 38,
    vacant_bed_icu_without_ventilator: 17,
    vacant_icu_beds_with_ventilator: 12,
    latitude: 26.8621,
    longitude: 80.9429
  }
];

export const calculateTotalVacantBeds = (hospital: Hospital): number => {
  return (
    hospital.vacant_bed_isolation_without_oxygen +
    hospital.vacant_isolation_with_oxygen +
    hospital.vacant_bed_icu_without_ventilator +
    hospital.vacant_icu_beds_with_ventilator
  );
};

export const getHospitalStatus = (hospital: Hospital): 'available' | 'limited' | 'full' => {
  const totalVacant = calculateTotalVacantBeds(hospital);
  const totalCapacity = hospital.free_regulated_beds;
  const percentage = (totalVacant / totalCapacity) * 100;
  
  if (percentage >= 10) return 'available';
  if (percentage > 0) return 'limited';
  return 'full';
};
