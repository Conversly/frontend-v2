"use client"

import { useEffect } from "react"

declare global {
    interface Window {
        Calendly: any;
    }
}

export function CalendlyWidget() {
    useEffect(() => {
        // Load CSS
        const link = document.createElement("link")
        link.href = "https://assets.calendly.com/assets/external/widget.css"
        link.rel = "stylesheet"
        document.head.appendChild(link)

        // Load JS
        const script = document.createElement("script")
        script.src = "https://assets.calendly.com/assets/external/widget.js"
        script.async = true

        script.onload = () => {
            if (window.Calendly) {
                window.Calendly.initBadgeWidget({
                    url: 'https://calendly.com/shashank-tyagi-verly-ai/30min', // Using a placeholder/likely URL based on context or requiring update
                    text: 'Schedule time with me',
                    color: '#0069ff',
                    textColor: '#ffffff',
                    branding: true
                })
            }
        }

        document.body.appendChild(script)

        return () => {
            // Cleanup
            document.head.removeChild(link)
            document.body.removeChild(script)
            // Remove the badge element created by Calendly
            // Calendly usually creates a div with class 'calendly-badge-widget'
            const badge = document.querySelector(".calendly-badge-widget")
            if (badge) {
                badge.remove()
            }
        }
    }, [])

    return null
}
