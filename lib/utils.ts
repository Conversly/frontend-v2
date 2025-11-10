import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Download arbitrary JSON data as a file on the client.
 * Creates a Blob and an ephemeral anchor to trigger a safe download.
 */
export function downloadJsonFile(filename: string, data: unknown) {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename.endsWith(".json") ? filename : `${filename}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  } catch {
    // Intentionally swallow errors for UI helper
  }
}

/**
 * Calculate dynamic chat height based on message count
 * Increases height by 15% when message count reaches threshold
 * @param baseHeight - Base height string (e.g., "600px")
 * @param messageCount - Current number of messages
 * @param threshold - Message count threshold to trigger expansion (default: 3)
 * @returns Calculated height string
 */
export function calculateDynamicHeight(
  baseHeight: string,
  messageCount: number,
  threshold: number = 3
): string {
  if (messageCount < threshold) {
    return baseHeight
  }

  // Parse the height value and unit
  const match = baseHeight.match(/^(\d+(?:\.\d+)?)(px|rem|em|vh|%)$/)
  if (!match) {
    return baseHeight // Return original if format is unexpected
  }

  const [, value, unit] = match
  const numericValue = parseFloat(value)
  const increasedValue = numericValue * 1.15 // 15% increase

  return `${increasedValue}${unit}`
}
