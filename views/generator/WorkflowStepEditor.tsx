
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash, Plus } from "lucide-react";

interface WorkflowStep {
  name: string;
  description: string;
  script: string;
}

interface WorkflowStepEditorProps {
  steps: WorkflowStep[];
  onChange: (steps: WorkflowStep[]) => void;
}

export const WorkflowStepEditor: React.FC<WorkflowStepEditorProps> = ({
  steps,
  onChange,
}) => {
  const handleChange = (i: number, field: keyof WorkflowStep, value: string) => {
    const updated = steps.map((s, idx) =>
      idx === i ? { ...s, [field]: value } : s
    );
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([
      ...steps,
      { name: "", description: "", script: "" },
    ]);
  };

  const handleDelete = (i: number) => {
    onChange(steps.filter((_, idx) => idx !== i));
  };

  return (
    <Card className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mt-2 space-y-5">
      {steps.length === 0 && (
        <div className="text-gray-500 text-sm text-center py-8">
          <Plus className="inline w-4 h-4 mr-1" />
          Add your first custom workflow step
        </div>
      )}
      {steps.map((step, i) => (
        <div key={i} className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg mb-3">
          <div className="flex justify-between items-center">
            <Badge className="text-xs bg-blue-500 mr-2">Step {i + 1}</Badge>
            <Button variant="ghost" size="icon" aria-label="Delete step" onClick={() => handleDelete(i)}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            <Input
              placeholder="Step Name (e.g. Install Deps)"
              value={step.name}
              onChange={e => handleChange(i, "name", e.target.value)}
              className="bg-white dark:bg-gray-800"
            />
            <Textarea
              placeholder="Description (optional)"
              value={step.description}
              onChange={e => handleChange(i, "description", e.target.value)}
              className="bg-white dark:bg-gray-800"
            />
            <Textarea
              placeholder="Script/Commands to run (e.g. npm ci && npm test)"
              value={step.script}
              onChange={e => handleChange(i, "script", e.target.value)}
              className="text-xs font-mono bg-white dark:bg-gray-800"
              rows={2}
            />
          </div>
        </div>
      ))}

      <Button
        onClick={handleAdd}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold w-full mt-2"
        variant="outline"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Workflow Step
      </Button>
    </Card>
  );
};
