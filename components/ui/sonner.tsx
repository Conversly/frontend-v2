"use client"

import CheckCircle from "@mui/icons-material/CheckCircle"
import Info from "@mui/icons-material/Info"
import Warning from "@mui/icons-material/Warning"
import Error from "@mui/icons-material/Error"
import { CircularProgress } from "@mui/material"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircle sx={{ fontSize: 16 }} />,
        info: <Info sx={{ fontSize: 16 }} />,
        warning: <Warning sx={{ fontSize: 16 }} />,
        error: <Error sx={{ fontSize: 16 }} />,
        loading: <CircularProgress size={16} sx={{ display: "block" }} />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
