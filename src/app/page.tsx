import GradientTitle from "@/components/GradientTitle";
import TodoList from "@/components/TodoList";
import GradientButton from "@/components/GradientButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <GradientTitle>My Actions TodoList</GradientTitle>
      <TodoList />
       
      {/* Bouton pour aller au Carousel */}
      <Link href="/carousel">
        <GradientButton>🔜 Carousel</GradientButton>
      </Link>
    </div>
  );
}