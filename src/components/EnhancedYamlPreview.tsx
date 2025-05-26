
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Settings, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EnhancedYamlPreviewProps {
  workflow: {
    yaml: string;
    filename: string;
    instructions: string[];
  };
}

export const EnhancedYamlPreview: React.FC<EnhancedYamlPreviewProps> = ({ workflow }) => {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [highlightSyntax, setHighlightSyntax] = useState(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(workflow.yaml);
      toast({
        title: "Copied!",
        description: "Pipeline configuration copied to clipboard",
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
    if (!workflow.yaml) return;
    
    const blob = new Blob([workflow.yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = workflow.filename || 'pipeline.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `Pipeline file downloaded as ${workflow.filename}`,
    });
  };

  const renderYamlWithSyntaxHighlighting = (yaml: string) => {
    if (!highlightSyntax) {
      return <pre className="text-gray-700 font-mono text-sm whitespace-pre-wrap">{yaml}</pre>;
    }

    const lines = yaml.split('\n');
    return (
      <pre className="text-sm font-mono">
        {lines.map((line, index) => {
          let highlightedLine: React.ReactNode;
          
          // Simple syntax highlighting
          if (line.trim().endsWith(':') && !line.includes('|') && !line.includes('>')) {
            highlightedLine = <span className="text-blue-600 font-semibold">{line}</span>;
          } else if (line.trim().startsWith('- ')) {
            const parts = line.split('- ');
            highlightedLine = (
              <span>
                {parts[0]}<span className="text-blue-500">- </span>
                <span className="text-green-600">{parts.slice(1).join('- ')}</span>
              </span>
            );
          } else if (line.includes(': ') && !line.trim().startsWith('#')) {
            const [key, ...valueParts] = line.split(': ');
            const value = valueParts.join(': ');
            highlightedLine = (
              <span>
                <span className="text-purple-600">{key}</span>
                <span className="text-gray-700">: </span>
                <span className="text-green-600">{value}</span>
              </span>
            );
          } else if (line.trim().startsWith('#')) {
            highlightedLine = <span className="text-gray-500 italic">{line}</span>;
          } else {
            highlightedLine = <span className="text-gray-700">{line}</span>;
          }

          return (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="text-gray-400 text-xs mr-4 select-none w-8 text-right">
                  {index + 1}
                </span>
              )}
              <span className="flex-1">{highlightedLine}</span>
            </div>
          );
        })}
      </pre>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-professional p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Generated Pipeline</h3>
            {workflow.filename && (
              <p className="text-sm text-gray-600 mt-1">{workflow.filename}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {showLineNumbers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHighlightSyntax(!highlightSyntax)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!workflow.yaml}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadYaml}
              disabled={!workflow.yaml}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto max-h-96 min-h-[400px]">
          {workflow.yaml ? (
            renderYamlWithSyntaxHighlighting(workflow.yaml)
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-gray-400 text-4xl mb-3">⚙️</div>
                <p className="text-gray-500 text-lg font-medium">
                  Configure your tech stack and generate your pipeline
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Select your technologies and features to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Setup Instructions */}
      {workflow.instructions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Setup Instructions
          </h4>
          <div className="space-y-3">
            {workflow.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                  {index + 1}
                </div>
                <p className="text-blue-800 text-sm leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
