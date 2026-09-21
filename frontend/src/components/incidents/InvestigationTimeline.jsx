import React from 'react';
import { Clock, CheckCircle2, Radio, Cpu, Ship, Satellite } from 'lucide-react';

export default function InvestigationTimeline({ timeline = [] }) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-ocean-secondary border border-ocean-border text-xs text-ocean-textMuted text-center">
        No investigation timeline events logged yet.
      </div>
    );
  }

  const getStepIcon = (index) => {
    switch (index) {
      case 0:
        return Satellite;
      case 1:
        return Cpu;
      case 2:
        return Radio;
      case 3:
      default:
        return Ship;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-ocean-border">
      {timeline.map((step, idx) => {
        const StepIcon = getStepIcon(idx);
        return (
          <div key={idx} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-ocean-secondary border-2 border-ocean-cyan flex items-center justify-center text-ocean-cyan shadow-glow-cyan">
              <StepIcon className="w-2.5 h-2.5" />
            </div>

            <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 hover:border-ocean-cyan/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="text-xs font-bold text-ocean-textPrimary">
                  {step.title}
                </h4>
                <span className="text-[10px] font-mono text-ocean-textMuted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-ocean-cyan" />
                  {step.time}
                </span>
              </div>
              <p className="text-xs text-ocean-textSecondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
