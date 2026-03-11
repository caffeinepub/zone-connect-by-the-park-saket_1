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
    weddingDate: Time;
    serviceType: ServiceType;
    message: string;
    timestamp: Time;
    coupleNames: string;
    phoneNumber: string;
}
export type Time = bigint;
export enum ServiceType {
    destinationWedding = "destinationWedding",
    bridalPortrait = "bridalPortrait",
    candidPhotography = "candidPhotography",
    weddingPhotography = "weddingPhotography",
    preWeddingShoot = "preWeddingShoot",
    cinematicFilm = "cinematicFilm"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(coupleNames: string, weddingDate: Time, phoneNumber: string, serviceType: ServiceType, message: string): Promise<void>;
}
