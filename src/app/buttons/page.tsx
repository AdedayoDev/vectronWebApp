import { Button } from "@/components/shared/button"
import { FaThumbsUp } from "react-icons/fa"
export default function ButtonShowcase() {
  const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
  const sizes = ['default', 'sm', 'lg', 'xl', 'icon'] as const

  return (
    <div className="p-8 space-y-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Button Variants</h1>
      
      {variants.map((variant) => (
        <div key={variant} className="space-y-4">
          <h2 className="text-xl font-semibold capitalize">{variant}</h2>
          <div className="flex flex-wrap gap-8">
            {sizes.map((size) => (
              <Button
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                className="gap-2"
              >
                <FaThumbsUp />{size === "icon" ? "" : `${variant} - ${size}`}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button asChild>
            <a href="#">As Anchor Link</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
