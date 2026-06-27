import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { useLS, LS, type WidgetInstance, type WidgetType } from "@/lib/storage";
import { WidgetShell } from "./WidgetShell";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { ThoughtOfTheDay } from "@/components/widgets/ThoughtOfTheDay";
import { SkillsInDemand } from "@/components/widgets/SkillsInDemand";
import { EssentialsVsExpertise } from "@/components/widgets/EssentialsVsExpertise";
import { InterviewChallenge } from "@/components/widgets/InterviewChallenge";
import { LaggingIndicators } from "@/components/widgets/LaggingIndicators";
import { MyProjects } from "@/components/widgets/MyProjects";
import { ClockGreeting } from "@/components/widgets/ClockGreeting";
import { PricingSim } from "@/components/widgets/PricingSim";
import { AnomalySpotter } from "@/components/widgets/AnomalySpotter";
import { CreditScorecard } from "@/components/widgets/CreditScorecard";

const DEFAULT_WIDGETS: WidgetInstance[] = [
  { id: "w-clock", type: "clock" },
  { id: "w-thought", type: "thought" },
  { id: "w-skills", type: "skillsInDemand" },
  { id: "w-challenge", type: "challenge" },
  { id: "w-essentials", type: "essentialsVsExpertise" },
  { id: "w-lags", type: "laggingIndicators" },
  { id: "w-projects", type: "projects" },
];

const META: Record<WidgetType, { title: string; subtitle?: string; accent?: boolean }> = {
  clock: { title: "Now" },
  thought: { title: "Thought of the day", accent: true },
  skillsInDemand: { title: "Skills in demand", subtitle: "Data Analytics · 2026" },
  challenge: { title: "Interview challenge", subtitle: "Type → keyword grade", accent: true },
  essentialsVsExpertise: { title: "Essentials vs expertise" },
  laggingIndicators: { title: "Lagging indicators", subtitle: "From your answers" },
  projects: { title: "My projects", subtitle: "One-line cards" },
  pricingSim: { title: "Pricing elasticity sim", subtitle: "Slider · ecomm", accent: true },
  anomalySpotter: { title: "Anomaly spotter", subtitle: "Click the spike", accent: true },
  creditScorecard: { title: "Credit risk scorecard", subtitle: "Weights · fintech", accent: true },
};

function renderWidget(type: WidgetType) {
  switch (type) {
    case "clock": return <ClockGreeting />;
    case "thought": return <ThoughtOfTheDay />;
    case "skillsInDemand": return <SkillsInDemand />;
    case "challenge": return <InterviewChallenge />;
    case "essentialsVsExpertise": return <EssentialsVsExpertise />;
    case "laggingIndicators": return <LaggingIndicators />;
    case "projects": return <MyProjects />;
    case "pricingSim": return <PricingSim />;
    case "anomalySpotter": return <AnomalySpotter />;
    case "creditScorecard": return <CreditScorecard />;
  }
}

export function WidgetBoard() {
  const [widgets, setWidgets] = useLS<WidgetInstance[]>(LS.widgets, DEFAULT_WIDGETS);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = widgets.findIndex((w) => w.id === active.id);
    const newIdx = widgets.findIndex((w) => w.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    setWidgets(arrayMove(widgets, oldIdx, newIdx));
  };

  const remove = (id: string) => setWidgets(widgets.filter((w) => w.id !== id));
  const add = (type: WidgetType) => {
    setWidgets([...widgets, { id: `w-${type}-${Math.random().toString(36).slice(2, 7)}`, type }]);
  };
  const reset = () => setWidgets(DEFAULT_WIDGETS);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
          {widgets.length} widget{widgets.length === 1 ? "" : "s"} · drag to rearrange
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-md border border-[var(--rule)] text-sm font-mono text-[var(--muted-foreground)] hover:text-[var(--ink)]"
          >
            Reset layout
          </button>
          <AddWidgetDialog existing={widgets.map((w) => w.type)} onAdd={add} />
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-min">
            {widgets.map((w) => {
              const meta = META[w.type];
              return (
                <WidgetShell
                  key={w.id}
                  id={w.id}
                  title={meta.title}
                  subtitle={meta.subtitle}
                  accent={meta.accent ? "•" : undefined}
                  onRemove={() => remove(w.id)}
                >
                  {renderWidget(w.type)}
                </WidgetShell>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {widgets.length === 0 && (
        <div className="paper rounded-md p-8 text-center text-sm font-serif text-[var(--muted-foreground)]">
          Empty board. Add a widget to get started.
        </div>
      )}
    </div>
  );
}
