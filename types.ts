export interface Flat {
    id: number;
    name: string;
    location: string;
    price: number;
    description: string;
    distance: number;
    amenities: string[];
    availability: string;
    images: string[];
    roomNumber: number;
}

export interface Booking {
    flatId: number;
    userEmail: string;
    startDate: string;
    endDate: string;
}

export interface FlatBooking {
  booking_id: number;
  flat: Flat;
}

export interface CarModel {
    id: string;
    brandName: string;
    name: string;
    productionYear: number;
    fuelType: string;
    fuelCapacity: number;
    seatCount: number;
    doorCount: number;
    dailyRate: number;
  }
  
  export interface LocationData {
    id: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
  }
  
  export interface Car {
    id: string;
    model: CarModel;
    location: LocationData;
    imageUrl?: string;
  }

export interface Customer {
    id: string;
    email: string;
}
  
export interface Rental {
    id: string;
    car: Car;
    customer: Customer;
    startAt: string;
    endAt: string;
    isCancelled: boolean;
}