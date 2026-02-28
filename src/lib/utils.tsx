import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import placeholder1 from '../assets/image1.png'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleImageError(e:any){
  e.target.src = placeholder1
}
