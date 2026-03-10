import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    checkIn: Time;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    checkOut: Time;
    phone: string;
    roomType: string;
}
export type Time = bigint;
export interface SpecialOffer {
    title: string;
    active: boolean;
    description: string;
    discountPercentage: bigint;
    validUntil: Time;
}
export interface backendInterface {
    addSpecialOffer(title: string, description: string, discountPercentage: bigint, validUntil: Time): Promise<void>;
    getActiveOffers(): Promise<Array<SpecialOffer>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getInquiryCount(): Promise<bigint>;
    submitInquiry(name: string, email: string, phone: string, checkIn: Time, checkOut: Time, roomType: string, message: string): Promise<void>;
}
