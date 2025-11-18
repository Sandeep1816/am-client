import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.title}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-48"
        />

        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>

        <p className="text-sm text-gray-600">
          {(product.priceInr / 100).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </div>
    </Link>
  );
}
