import Link from "next/link"
import { Stethoscope } from "lucide-react"

interface LogoProps {
  size?: "small" | "medium" | "large"
}

export default function Logo({ size = "medium" }: LogoProps) {
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 60, height: 60 },
  }

  const { width, height } = dimensions[size]

  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className="relative flex items-center justify-center bg-gradient-to-r from-[#650CB5] to-[#57BA98] rounded-full"
        style={{ width, height }}
      >
        <Stethoscope className="text-white" size={width * 0.6} />
      </div>
      <span
        className={`font-bold ${size === "small" ? "text-base" : size === "medium" ? "text-xl" : "text-2xl"} hidden sm:inline-block`}
      >
        SwapnilCare
      </span>
    </Link>
  )
}

