import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/dashboard/Header";
import { WidgetBoard } from "@/components/dashboard/WidgetBoard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Analyst Worksheet — personalized data analytics portfolio" },
      {
        name: "description",
        content:
          "iGoogle-style personalized portfolio for data analysts: in-demand skills, beginner vs expert ladders, typed interview challenges with lagging-indicator detection, and editable project cards.",
      },
      { property: "og:title", content: "Analyst Worksheet — data analytics portfolio" },
      {
        property: "og:description",
        content: "Drag-and-drop widgets: skills in demand, essentials vs expertise, typed interview challenges, lagging indicators, your projects.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <WidgetBoard />
      </main>
      <footer className="max-w-7xl mx-auto px-4 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--muted-foreground)] text-center">
        Worksheet · field notes for the data analyst on shift
      </footer>
    </div>
  );
}
