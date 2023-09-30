import { GlobalError } from "src/types/global";

export function createGlobalError(code: number, message: string): GlobalError {
  return { code, message };
}
