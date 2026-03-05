import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex h-full min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CircularProgress size={16} />
        Loading playground…
      </div>
    </div>
  );
}

