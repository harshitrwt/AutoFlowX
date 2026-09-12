
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';
import { toast } from '@/controllers/useToastController';

interface YamlPreviewProps {
  yaml: string;
}

export const YamlPreview: React.FC<YamlPreviewProps> = ({ yaml }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      toast({
        title: "Copied!",
        description: "YAML copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadYaml = () => {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'main.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "YAML file downloaded as main.yml",
    });
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Generated YAML</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            disabled={!yaml}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadYaml}
            disabled={!yaml}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hidden md:block"
          >
            <Download className="w-4 h-4 mr-2 hidden md:block" />
            Download
          </Button>
        </div>
      </div>

      <div className="bg-gray-950 rounded-lg p-4 overflow-auto max-h-96">
        {yaml ? (
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            <code>{yaml}</code>
          </pre>
        ) : (
          <div className="text-gray-500 text-center py-8">
            Configure your stack and click "Generate Pipeline" to see the YAML output
          </div>
        )}
      </div>
    </Card>
  );
};
