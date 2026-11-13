"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Star, StarHalf, ShoppingBag, ChevronRight,
  Shield, Truck, RotateCcw, Plus, Minus, Check,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  tagline: string;
  images: string[];
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice: number;
  currency: string;
  dealBadge: string;
  category: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  sizes: string[];
}

// Data will be fetched dynamically from backend

const TRUST_BADGES = [
  { Icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
  { Icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
  { Icon: Shield, label: "100% Authentic", sub: "Genuine products only" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating))
      return <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />;
    if (i === Math.floor(rating) && rating % 1 !== 0)
      return <StarHalf key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />;
    return <Star key={i} className="w-4 h-4 fill-ink-200 text-ink-200" />;
  });

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"benefits" | "ingredients" | "how-to">("benefits");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(false);
  const [showAllThumbs, setShowAllThumbs] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
          ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '')
          : 'http://localhost:5000';

        const [prodRes, catRes] = await Promise.all([
          axios.get(`${baseUrl}/api/v1/products`),
          axios.get(`${baseUrl}/api/v1/categories`)
        ]);

        const prodJson = prodRes.data;
        const catJson = catRes.data;

        let activeCatNames: string[] = [];
        if (catJson.success && catJson.data) {
          activeCatNames = catJson.data
            .filter((c: any) => c.status === 'ACTIVE')
            .map((c: any) => c.name.toLowerCase());
        }

        if (prodJson.success && prodJson.data) {
          const activeProducts = prodJson.data.filter((p: any) =>
            activeCatNames.includes((p.category || "").toLowerCase())
          );

          const mapped = activeProducts.map((p: any) => ({
            id: p._id,
            name: p.name,
            tagline: p.description || "",
            images: p.images && p.images.length > 0 ? p.images : ["/products/suncream-1.jpg"],
            rating: p.starRating || 0,
            reviewCount: p.reviewsCount || 0,
            currentPrice: p.variants?.[0]?.price || 0,
            originalPrice: p.variants?.[0]?.oldPrice || p.variants?.[0]?.price || 0,
            currency: "₹",
            dealBadge: p.offerText || "",
            category: p.category || "all",
            benefits: p.keyFeatures ? p.keyFeatures.split(/,|\n/).map((s: string) => s.trim()).filter(Boolean) : ["Premium Quality"],
            ingredients: p.description || "Refer to packaging",
            howToUse: "Follow instructions on packaging",
            sizes: p.variants && p.variants.length > 0 ? p.variants.map((v: any) => v.volume) : ["Standard"],
          }));
          setProducts(mapped);
          const found = mapped.find((p: any) => p.id === id) || null;
          setProduct(found);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProducts();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const savedUser = localStorage.getItem("chooseme_user");
    if (!savedUser) {
      router.push("/sign-in");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.currentPrice,
      currency: product.currency,
      size: product.sizes?.[selectedSize],
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  // Reset qty when variant changes
  const handleSizeChange = (i: number) => {
    setSelectedSize(i);
    setQty(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ink-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="font-sans font-bold text-3xl text-ink-900 mb-2">Product Not Found</h1>
        <p className="text-ink-500 mb-8">We couldn&apos;t find the product you&apos;re looking for.</p>
        <Link
          href="/products"
          className="bg-ink-900 text-white font-bold text-sm uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-ink-800 transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  const discount = Math.round((1 - product.currentPrice / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-cream pt-30">

      {/* ── Breadcrumb ── */}
      <nav
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center gap-2 text-xs font-sans text-ink-400"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/products" className="hover:text-ink-700 transition-colors">Products</Link>
        <ChevronRight size={12} />
        <span className="text-ink-700 font-semibold line-clamp-1">{product.name}</span>
      </nav>

      {/* ── Main Section ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── Left: Image Gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-ink-50 border border-ink-100">
              {product.images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                  className={`object-cover transition-opacity duration-500 ${i === activeImage ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
              {/* Deal Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className={`flex gap-3 ${showAllThumbs ? "flex-wrap" : "flex-nowrap md:flex-wrap overflow-hidden"}`}>
                {product.images.map((src, i) => {
                  const isFourth = i === 3;
                  const isExtra = i > 3;
                  const hasMore = product.images.length > 4;

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveImage(i);
                        if (isFourth && hasMore && !showAllThumbs) {
                          setShowAllThumbs(true);
                        }
                      }}
                      aria-label={`View image ${i + 1}`}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${i === activeImage ? "border-ink-900 shadow-md" : "border-ink-200 hover:border-ink-400"
                        } ${!showAllThumbs && isExtra && hasMore ? "hidden md:block" : ""}`}
                    >
                      <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
                      {!showAllThumbs && isFourth && hasMore && (
                        <div className="absolute inset-0 bg-black/40 flex md:hidden items-center justify-center text-white backdrop-blur-[1px]">
                          <Plus size={28} strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-brand-600 mb-3">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="font-serif font-normal text-3xl md:text-4xl text-ink-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Tagline */}
            <div className="mb-5">
              <p className={`font-sans text-ink-500 text-base leading-relaxed whitespace-pre-wrap transition-all duration-300 ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                {product.tagline}
              </p>
              {product.tagline && product.tagline.length > 150 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-brand-600 font-semibold text-sm mt-1 hover:text-brand-800 transition-colors inline-block"
                >
                  {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                {renderStars(product.rating)}
              </div>
              <span className="text-sm font-semibold text-ink-700">{product.rating.toFixed(1)}</span>
              {product.reviewCount > 0 && (
                <span className="text-sm text-ink-400">({product.reviewCount} reviews)</span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-ink-100 mb-6" />

            {/* Price */}
            <div className="flex items-end gap-3 mb-2">
              <span className="font-sans font-bold text-4xl text-ink-900">
                {product.currency}{product.currentPrice}
              </span>
              <span className="font-sans text-lg text-ink-400 line-through mb-0.5">
                {product.currency}{product.originalPrice}
              </span>
            </div>
            <p className="font-bold text-xs uppercase tracking-wider text-brand-600 mb-6">
              {product.dealBadge} — You save {product.currency}{product.originalPrice - product.currentPrice}
            </p>

            {/* Size Selector */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <p className="font-sans font-semibold text-sm text-ink-700 mb-3 uppercase tracking-[0.1em]">
                  Size
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size, i) => {
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(i)}
                        className={`px-5 py-2.5 rounded-xl font-sans font-semibold text-sm border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 relative ${i === selectedSize
                          ? "border-ink-900 bg-ink-900 text-white"
                          : "border-ink-200 text-ink-600 hover:border-ink-400 bg-cream"
                          }`}
                        aria-pressed={i === selectedSize}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-sans font-semibold text-sm text-ink-700 uppercase tracking-[0.1em]">
                  Quantity
                </p>
              </div>
              <div className="inline-flex items-center border-2 border-ink-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-12 h-12 flex items-center justify-center text-ink-600 hover:bg-ink-50 transition-colors disabled:opacity-40"
                  disabled={qty <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-14 text-center font-bold text-lg text-ink-900 select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-12 h-12 flex items-center justify-center text-ink-600 hover:bg-ink-50 transition-colors disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${added
                  ? "bg-brand-500 text-white"
                  : "bg-ink-900 text-white hover:bg-ink-800"
                  }`}
              >
                {added ? (
                  <><Check size={18} /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={18} /> Add to Cart</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-5 bg-ink-50 rounded-2xl border border-ink-100">
              {TRUST_BADGES.map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                    <Icon size={16} className="text-white" />
                  </div>
                  <p className="font-sans font-bold text-xs text-ink-900 leading-tight">{label}</p>
                  <p className="font-sans text-[10px] text-ink-400 leading-tight">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Tabs ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Tab Bar */}
        <div className="flex border-b border-ink-200 mb-8 gap-8">
          {([
            { key: "benefits", label: "Benefits" },
            { key: "ingredients", label: "Ingredients" },
            { key: "how-to", label: "How to Use" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-4 font-sans font-bold text-sm uppercase tracking-[0.12em] border-b-2 transition-all duration-200 focus:outline-none ${activeTab === key
                ? "border-ink-900 text-ink-900"
                : "border-transparent text-ink-400 hover:text-ink-700"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-2xl">
          {activeTab === "benefits" && (
            <ul className="space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-brand-600" strokeWidth={3} />
                  </div>
                  <span className="font-sans text-base text-ink-700">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {activeTab === "ingredients" && (
            <div>
              <p className={`font-sans text-base text-ink-600 leading-relaxed whitespace-pre-wrap transition-all duration-300 ${!isIngredientsExpanded ? 'line-clamp-4' : ''}`}>
                {product.ingredients}
              </p>
              {product.ingredients && product.ingredients.length > 200 && (
                <button
                  onClick={() => setIsIngredientsExpanded(!isIngredientsExpanded)}
                  className="text-brand-600 font-semibold text-sm mt-2 hover:text-brand-800 transition-colors inline-block"
                >
                  {isIngredientsExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          )}
          {activeTab === "how-to" && (
            <p className="font-sans text-base text-ink-600 leading-relaxed">
              {product.howToUse}
            </p>
          )}
        </div>
      </section>

      {/* ── Related Products ── */}
      <section className="bg-ink-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-[0.12em] text-ink-900">
              You May Also Like
            </h2>
            <Link
              href="/products"
              className="font-sans font-bold text-sm text-brand-600 hover:text-brand-800 transition-colors uppercase tracking-wider"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group bg-cream rounded-2xl overflow-hidden border border-ink-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-ink-50">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-sans font-bold text-sm text-ink-900 line-clamp-2 mb-2">{p.name}</p>
                  <p className="font-bold text-base text-ink-900">{p.currency}{p.currentPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
