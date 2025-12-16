import React from 'react';
import { useClipboard } from '../../hooks/use-clipboard';
import { Icon } from './icon';
import { cn } from '../../lib/utils';

interface CodeBlockProps {
    children: string;
    title?: string;
    language?: 'tsx' | 'css' | 'json' | 'bash' | 'text';
    className?: string;
}

// Simple regex-based highlighter for visual improvement without heavy libraries
const highlightSyntax = (code: string, lang: string) => {
    if (lang === 'bash' || lang === 'text') return code; // Return plain for bash/text

    let highlighted = code
        // Strings
        .replace(/(['"`])(.*?)\1/g, '<span class="text-brand-green">$1$2$1</span>')
        // Keywords
        .replace(/\b(import|export|from|const|let|var|return|function|interface|type|enum|if|else|switch|case|default)\b/g, '<span class="text-brand-pink">$1</span>')
        // Types/Classes
        .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-brand-yellow">$1</span>')
        // Functions
        .replace(/\b([a-z][a-zA-Z0-9_]*)(?=\()/g, '<span class="text-brand-blue">$1</span>')
        // Numbers
        .replace(/\b(\d+)\b/g, '<span class="text-brand-mint">$1</span>')
        // Comments
        .replace(/(\/\/.*)/g, '<span class="text-muted-foreground italic">$1</span>');

    return highlighted;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, title, language = 'tsx', className }) => {
    const { isCopied, copyToClipboard } = useClipboard();

    // Ensure children is string
    const codeString = String(children).trim();
    const highlightedCode = highlightSyntax(codeString, language);

    return (
        <div className={cn("rounded-lg overflow-hidden border border-border bg-[#1e1e1e] text-[#d4d4d4] my-4 shadow-sm group relative font-mono text-sm", className)}>
            {title && (
                <div className="bg-[#252526] px-4 py-2 border-b border-[#3e3e42] text-xs text-[#858585] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon name={language === 'bash' || language === 'text' ? 'file-edit' : 'file-code'} size="size-3" className="text-brand-blue" />
                        <span className="font-semibold">{title}</span>
                    </div>
                    <button 
                        onClick={() => copyToClipboard(codeString)}
                        className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-wider text-muted-foreground hover:text-white"
                    >
                        {isCopied ? (
                            <><Icon name="check" size="size-3" className="text-green-500" /> Copied</>
                        ) : (
                            <><Icon name="copy" size="size-3" /> Copy</>
                        )}
                    </button>
                </div>
            )}
            <div className="p-4 overflow-x-auto leading-relaxed custom-scrollbar selection:bg-brand-blue/30 selection:text-white">
                <pre 
                    className={cn(language === 'text' ? "whitespace-pre-wrap break-words font-sans text-sm" : "")}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }} 
                />
            </div>
        </div>
    );
};