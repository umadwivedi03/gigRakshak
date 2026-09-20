import React, { useState } from "react";
import { FileText, Upload, Eye, Share, Trash2, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const docs = [
  { id: 1, title: "Aadhaar Card", status: "verified", uploaded: "Mar 1, 2026", detail: "XXXX XXXX 4521" },
  { id: 2, title: "Driving Licence", status: "verified", uploaded: "Mar 1, 2026", detail: "MH-02-2019-XXXXX" },
  { id: 3, title: "Platform ID (Zomato)", status: "verified", uploaded: "Mar 1, 2026", detail: "ZOM-AR-28473" },
  { id: 4, title: "Vehicle Registration", status: "missing", uploaded: null, detail: null },
  { id: 5, title: "Insurance Certificate", status: "missing", uploaded: null, detail: null },
];

const DocumentVault: React.FC = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [uploadedIds, setUploadedIds] = useState<number[]>([]);
  const [deleting, setDeleting] = useState<number | null>(null);

  const verified = docs.filter(d => d.status === "verified" || uploadedIds.includes(d.id)).length;

  const handleShare = () => {
    toast({ title: "Shared!", description: "Legal team has received your verified documents." });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Document Vault</h1>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Your documents, secured and always ready.</p>

      {/* Progress */}
      <div className="gs-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{verified} of 5 documents uploaded</span>
          <span className="gs-pill-warning">{verified}/5</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${(verified / 5) * 100}%`, background: "var(--accent-amber)" }} />
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {docs.map(doc => {
          const isUploaded = doc.status === "verified" || uploadedIds.includes(doc.id);
          return (
            <div key={doc.id} className="gs-card overflow-hidden">
              <button className="w-full flex items-center justify-between text-left" onClick={() => setExpanded(expanded === doc.id ? null : doc.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: isUploaded ? "var(--accent-teal-glow)" : "var(--bg-elevated)" }}>
                    <FileText size={18} style={{ color: isUploaded ? "var(--accent-teal)" : "var(--text-tertiary)" }} />
                  </div>
                  <div>
                    <div className="font-semibold font-sora text-sm" style={{ color: "var(--text-primary)" }}>{doc.title}</div>
                    <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      {isUploaded ? `Uploaded ${doc.uploaded || "Just now"}` : "Not uploaded"}
                    </div>
                  </div>
                </div>
                {isUploaded
                  ? <span className="gs-pill-safe text-xs">Verified ✓</span>
                  : <span className="gs-pill-warning text-xs">Missing</span>}
              </button>

              {expanded === doc.id && (
                <div className="mt-4 pt-4 animate-slide-up" style={{ borderTop: "1px solid var(--border)" }}>
                  {isUploaded ? (
                    <div className="space-y-3">
                      {doc.detail && <p className="text-sm" style={{ color: "var(--text-secondary)" }}>ID: {doc.detail}</p>}
                      <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: "var(--bg-elevated)", border: "1px dashed var(--border-strong)" }}>
                        <div className="text-center">
                          <FileText size={24} style={{ color: "var(--text-tertiary)", margin: "0 auto 4px" }} />
                          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Document Preview</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="gs-btn-ghost flex-1 text-sm flex items-center justify-center gap-1" style={{ padding: "8px" }}>
                          <Eye size={14} /> View
                        </button>
                        <button className="gs-btn-ghost flex-1 text-sm flex items-center justify-center gap-1" style={{ padding: "8px" }}>
                          <Share size={14} /> Share
                        </button>
                        {deleting !== doc.id
                          ? <button onClick={() => setDeleting(doc.id)} className="text-sm flex items-center gap-1 px-3 py-2 rounded-xl"
                              style={{ color: "var(--accent-red)", border: "1px solid rgba(229,72,77,0.3)", background: "transparent", cursor: "pointer" }}>
                              <Trash2 size={14} />
                            </button>
                          : <button onClick={() => setDeleting(null)} className="text-xs px-3 py-2 rounded-xl"
                              style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)", border: "none", cursor: "pointer" }}>Cancel</button>
                        }
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                        style={{ background: "var(--bg-elevated)", border: "2px dashed var(--border-strong)" }}
                        onClick={() => { setUploadedIds(prev => [...prev, doc.id]); }}>
                        <Upload size={20} style={{ color: "var(--accent-teal)" }} />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Tap to upload or take a photo</span>
                        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Accepted: JPG, PNG, PDF</span>
                      </div>
                      {uploadedIds.includes(doc.id) && (
                        <div className="mt-2 p-2 rounded-lg text-sm" style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)" }}>
                          ✓ Document uploaded. Verification in progress (usually within 1 hour).
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency Share */}
      <div className="gs-card text-center" style={{ borderColor: "rgba(26,175,128,0.3)" }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: "var(--accent-teal-glow)" }}>
          <Share size={20} style={{ color: "var(--accent-teal)" }} />
        </div>
        <h3 className="font-bold font-sora mb-2" style={{ color: "var(--text-primary)" }}>Emergency Share</h3>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>In an emergency, share all verified documents instantly with your legal team.</p>
        <button onClick={handleShare} className="gs-btn-primary w-full">Share All with Legal Team</button>
      </div>
    </div>
  );
};

export default DocumentVault;
