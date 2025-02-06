import ImageCarousel from "@/components/ImageCarousel";
import GradientTitle from "@/components/GradientTitle";
import GradientButton from "@/components/GradientButton";
import Link from "next/link";

export default function CarouselPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <GradientTitle>My Ansible Carousel</GradientTitle>
      <ImageCarousel />

      {/* Bouton Retour à la TodoList */}
      <Link href="/">
        <GradientButton>🔙 TodoList</GradientButton>
      </Link>
    </div>
  );
}