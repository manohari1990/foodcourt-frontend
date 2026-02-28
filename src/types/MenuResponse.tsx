import type { PaginationMeta } from "./PaginationMeta";

export interface MenuData{
    id: string,
    stall_id: string,
    name: string,
    price: number,
    item_image: string,
    serving_quantity: number,
    serving_quantity_units: string,
    is_available: boolean,
    description: string,
    discount: number,
    is_deleted: boolean,
    created_at: string,
    updated_at: string
}

export interface MenuResponse{
    status_code: number,
    message: string,
    data: MenuData[],
    pagination: PaginationMeta
}