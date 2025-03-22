import Image from "next/image"
import Link from "next/link"

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
      <div className="relative" style={{ width, height }}>
        <Image src="/logo.png" alt="SwapnilCare Logo" fill className="object-contain" priority />
      </div>
      <span
        className={`font-bold ${size === "small" ? "text-base" : size === "medium" ? "text-xl" : "text-2xl"} hidden sm:inline-block`}
      >
        SwapnilCare
      </span>
    </Link>
  )
}

