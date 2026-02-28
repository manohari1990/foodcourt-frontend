import type { PaginationMeta } from "./PaginationMeta";

export interface OrderData{
    id: string,
    table_number: number,
    stall_id: string,
    order_status: string,
    payment_status: string,
    total_payment: number,
    estimated_time?: number,
    created_at: string,
    updated_at: string
}

export interface OrderResponse{
    status_code: number,
    message: string,
    data: OrderData[],
    pagination: PaginationMeta
}