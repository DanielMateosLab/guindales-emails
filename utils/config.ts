import { Contact } from "./types"

export const pageSize: number = 10

export const validSortFields: Array<keyof Contact> = ["_id", "name"]
export const validSortOrders = [1, -1]
