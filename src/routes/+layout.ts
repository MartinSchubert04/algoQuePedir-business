import { error } from "@sveltejs/kit";
import { healthService } from "$lib/services/healthCheckService.js";

export async function load() {
  try {
    const res = await healthService.healthCheck();
    return { backendStatus: res };
  } catch (err){
    console.error(err)
    throw error(503, "Backend no disponible");
  }
}
