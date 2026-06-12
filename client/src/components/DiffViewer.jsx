
import parseDiffText from "../utils/parseDiffText";
import { useState } from "react";

const SEV_STYLE = {
    critical: '#f85149', high: '#e3a836',
    medium: '#58a6ff', low: '#8b949e',
};
const CAT_ICON = {
    security: '🔒', performance: '⚡', bug: '🐛', style: '🎨'
};

function InlineComment({ comment }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            borderLeft: `3px solid \${SEV_STYLE[comment.severity]}`,
            background: '#161b22', margin: '0'
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', cursor: 'pointer'
            }}
                onClick={() => setOpen(!open)}>
                <span style={{
                    fontSize: '10px', fontWeight: 600, padding: '2px 7px',
                    borderRadius: '4px', color: SEV_STYLE[comment.severity],
                    border: `1px solid \${SEV_STYLE[comment.severity]}44`,
                    background: `\${SEV_STYLE[comment.severity]}18`
                }}>
                    {comment.severity}
                </span>
                <span>{CAT_ICON[comment.category]}</span>
                <span style={{ fontSize: '12px', color: '#c9d1d9', flex: 1 }}>
                    {comment.message}
                </span>
                <span style={{ fontSize: '11px', color: '#8b949e' }}>
                    {open ? '▴' : '▾'}
                </span>
            </div>
            {open && (
                <div style={{
                    padding: '0 14px 12px 14px', display: 'flex',
                    flexDirection: 'column', gap: '10px'
                }}>
                    {comment.why_it_matters && (
                        <div>
                            <p style={{
                                fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase',
                                color: '#8b949e', margin: '0 0 4px'
                            }}>WHY IT MATTERS</p>
                            <p style={{
                                fontSize: '12px', color: '#c9d1d9', margin: 0,
                                borderLeft: '3px solid #333', paddingLeft: '10px'
                            }}>
                                {comment.why_it_matters}
                            </p>
                        </div>
                    )}
                    {comment.offending_code && (
                        <div>
                            <p style={{
                                fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase',
                                color: '#8b949e', margin: '0 0 4px'
                            }}>OFFENDING CODE</p>
                            <pre style={{
                                background: '#0d1117', border: '1px solid #2a2a2a', borderRadius: '6px',
                                padding: '8px 12px', fontSize: '12px', color: '#e6edf3', margin: 0,
                                overflowX: 'auto', fontFamily: 'monospace'
                            }}>
                                {comment.offending_code}
                            </pre>
                        </div>
                    )}
                    {comment.suggested_fix && (
                        <div>
                            <p style={{
                                fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase',
                                color: '#8b949e', margin: '0 0 4px'
                            }}>💡 SUGGESTED FIX</p>
                            <pre style={{
                                background: '#0d1117', borderLeft: '3px solid #2ea043', borderRadius: '0 6px 6px 0',
                                border: '1px solid rgba(46,160,67,.3)', padding: '8px 12px',
                                fontSize: '12px', color: '#7ee787', margin: 0,
                                overflowX: 'auto', fontFamily: 'monospace'
                            }}>
                                {comment.suggested_fix}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function DiffViewer({ diffText, comments = [] }) {
  if (!diffText) return <p style={{ color:'#8b949e', padding:'1rem' }}>No diff available.</p>;

  const files = parseDiffText(diffText);

  // Build lookup: 'fileName:lineNumber' → [comments]
  const commentMap = {};
  comments.forEach(c => {
    const key = c.file_name + ':' + c.line_number;
    if (!commentMap[key]) commentMap[key] = [];
    commentMap[key].push(c);
  });

  return (
    <div style={{ fontFamily:'monospace', fontSize:'13px' }}>
      {files.map((file, fi) => (
        <div key={fi} style={{ marginBottom:'24px', border:'1px solid #30363d', borderRadius:'8px', overflow:'hidden' }}>
          <div style={{ background:'#161b22', padding:'8px 14px', borderBottom:'1px solid #30363d' }}>
            <code style={{ color:'#c9d1d9', fontSize:'12px' }}>{file.filename}</code>
          </div>
          {file.lines.map((line, li) => {
            const key = file.filename + ':' + line.lineNumber;
            const lineComments = commentMap[key] || [];
            const bg = line.type === 'added'   ? '#0d2818'
                      : line.type === 'removed' ? '#2d0f0f' : 'transparent';
            const prefix = line.type === 'added'   ? '+'
                           : line.type === 'removed' ? '-' : ' ';
            return (
              <div key={li}>
                <div style={{ display:'flex', background:bg }}>
                  <span style={{ minWidth:'44px', padding:'2px 8px', color:'#8b949e',
                                  fontSize:'11px', textAlign:'right', userSelect:'none',
                                  borderRight:'1px solid #21262d', flexShrink:0 }}>
                    {line.lineNumber}
                  </span>
                  <span style={{ padding:'2px 4px 2px 0', minWidth:'16px', color:'#8b949e',
                                  textAlign:'center', flexShrink:0 }}>{prefix}</span>
                  <span style={{ padding:'2px 12px 2px 0', color:'#e6edf3', whiteSpace:'pre', flex:1 }}>
                    {line.content}
                  </span>
                </div>
                {lineComments.map((c, ci) => (
                  <InlineComment key={ci} comment={c} />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}