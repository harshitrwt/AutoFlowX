
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ciProviders = [
  { value: "github", label: "GitHub Actions" },
  { value: "gitlab", label: "GitLab CI" },
  { value: "jenkins", label: "Jenkins" },
  { value: "azure", label: "Azure Pipelines" },
  { value: "bitbucket", label: "Bitbucket Pipelines" }
];

interface CiProviderSelectProps {
  value: string;
  onChange: (v: string) => void;
}

export const CiProviderSelect: React.FC<CiProviderSelectProps> = ({ value, onChange }) => (
  <div>
    <label className="flex items-center mb-2 font-semibold text-gray-800 dark:text-gray-100">
      <Badge className="bg-orange-600 mr-2" /> CI/CD Provider
    </label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 h-12">
        <SelectValue placeholder="Select CI/CD provider" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800">
        {ciProviders.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
