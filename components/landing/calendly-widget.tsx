"use client"

import { useEffect } from "react"

declare global {
    interface Window {
        Calendly: any;
    }
}

export function CalendlyWidget() {
    useEffect(() => {
        // Optimize loading
        const preconnect = document.createElement("link")
        preconnect.rel = "preconnect"
        preconnect.href = "https://assets.calendly.com"
        document.head.appendChild(preconnect)

        const prefetch = document.createElement("link")
        prefetch.rel = "prefetch"
        prefetch.href = "https://calendly.com/rdhakad2002/30min"
        document.head.appendChild(prefetch)

        // Load CSS
        const link = document.createElement("link")
        link.href = "https://assets.calendly.com/assets/external/widget.css"
        link.rel = "stylesheet"
        document.head.appendChild(link)

        // Load JS
        const script = document.createElement("script")
        script.src = "https://assets.calendly.com/assets/external/widget.js"
        script.async = true


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
