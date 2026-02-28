import type { PaginationMeta } from "./PaginationMeta"

export interface StallData{
    id: string,
    stall_name: string,
    stall_type: string,
    status: string,
    display_order: number,
    stall_number: string,
    open_at: string,
    close_at: string,
    is_deleted: boolean,
    stall_image: string,
    contact_name: string,
    stall_area: string,
    discount: number,
    created_at:string,
    updated_at: string
}

export interface StallResponse{
    status_code: number,
    message: string,
    data: StallData[],
    pagination: PaginationMeta
}