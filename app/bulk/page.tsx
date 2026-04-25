'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { useAuth } from '@/components/AuthProvider';
import UpgradeDialog from '@/components/UpgradeDialog';
import {
  Upload, FileSpreadsheet, Download, Trash2, Loader2, Crown, AlertCircle,
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import { Platform } from '@/types/comment';
import TikTokVideoComment from '@/components/previews/TikTokVideoComment';
import InstagramPostComment from '@/components/previews/InstagramPostComment';
import YouTubeVideoComment from '@/components/previews/YouTubeVideoComment';
import TwitterPostComment from '@/components/previews/TwitterPostComment';
import { defaultCommentData } from '@/types/comment';

type BulkRow = {
  username: string;
  message: string;
  likes?: string;
  time?: string;
  isVerified?: boolean;
};

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok (Video Comment)',
  instagram: 'Instagram (Post Comment)',
  youtube: 'YouTube (Video Comment)',
  twitter: 'X (Post Reply)',
};

function PreviewFor({ platform, data }: { platform: Platform; data: any }) {
  if (platform === 'tiktok') return <TikTokVideoComment data={data} />;
  if (platform === 'instagram') return <InstagramPostComment data={data} />;
  if (platform === 'youtube') return <YouTubeVideoComment data={data} />;
  return <TwitterPostComment data={data} />;
}

export default function BulkPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [rows, setRows] = useState<BulkRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeMsg, setUpgradeMsg] = useState<string | undefined>(undefined);
  const renderRef = useRef<HTMLDivElement>(null);
  const [renderRow, setRenderRow] = useState<BulkRow | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login?next=/bulk');
  }, [loading, user, router]);

  const handleFile = async (file: File) => {
    setError(null);
    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase();
    try {
      let parsed: BulkRow[] = [];
      if (ext === 'csv' || ext === 'txt') {
        const text = await file.text();
        const out = Papa.parse(text, { header: true, skipEmptyLines: true });
        parsed = (out.data as any[]).map(normalizeRow).filter(validRow);
      } else if (ext === 'xlsx' || ext === 'xls') {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<any>(ws);
        parsed = json.map(normalizeRow).filter(validRow);
      } else {
        setError('Please upload a .csv, .xlsx, or .xls file.');
        return;
      }
      if (parsed.length === 0) {
        setError('No valid rows found. Make sure your file has username and message columns.');
        return;
      }
      if (parsed.length > 200) {
        setError(`Only up to 200 rows are supported per upload (your file has ${parsed.length}).`);
        return;
      }
      setRows(parsed);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to parse file');
    }
  };

  const generate = async () => {
    if (rows.length === 0) return;
    setError(null);
    setBusy(true);
    setProgress({ done: 0, total: rows.length });
    try {
      // Server pre-flight: log the bulk export attempt and check plan
      const pre = await fetch('/api/exports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          subMode: subModeFor(platform),
          mode: 'bulk',
          count: rows.length,
        }),
      });
      if (pre.status === 401) {
        router.push('/login?next=/bulk');
        return;
      }
      const preData = await pre.json();
      if (!pre.ok) {
        if (preData.upgrade) {
          setUpgradeMsg(preData.error);
          setUpgradeOpen(true);
        } else {
          setError(preData.error ?? 'Export failed');
        }
        return;
      }

      const zip = new JSZip();
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        setRenderRow(r);
        await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
        if (renderRef.current) {
          const canvas = await html2canvas(renderRef.current, { backgroundColor: null, scale: 2 });
          const blob: Blob = await new Promise((resolve) =>
            canvas.toBlob((b) => resolve(b!), 'image/png'),
          );
          const safeName = (r.username || `row-${i + 1}`).replace(/[^a-z0-9_-]/gi, '_');
          zip.file(`${String(i + 1).padStart(3, '0')}_${safeName}.png`, blob);
        }
        setProgress({ done: i + 1, total: rows.length });
      }
      setRenderRow(null);
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `commentcraft-${platform}-bulk.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e?.message ?? 'Generation failed');
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const data = renderRow ? buildData(renderRow, platform, theme) : null;

  if (loading) {
    return (
      <SiteLayout>
        <div className="max-w-[1000px] mx-auto px-6 py-20 text-center text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="max-w-[1000px] mx-auto px-6 pt-12 pb-16">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Power feature</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
            Bulk Comment Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-[640px]">
            Upload a CSV or Excel file with your comments. We render every row as a pixel-perfect screenshot
            and download them all as a single ZIP archive.
          </p>
        </div>

        {user?.plan === 'free' && (
          <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
            <Crown size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Bulk is a Pro feature</p>
              <p className="text-sm text-muted-foreground mt-1">
                You can preview and parse files on the Free plan, but generating the ZIP requires Pro or Business.
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-3 h-9 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center hover:opacity-90"
            >
              See plans
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2 block">
              Platform template
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground"
            >
              {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => (
                <option key={p} value={p}>
                  {PLATFORM_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2 block">
              Preview theme
            </label>
            <div className="flex gap-2">
              {(['light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 h-10 rounded-lg border text-sm font-semibold capitalize transition-colors ${
                    theme === t
                      ? 'gradient-primary text-primary-foreground border-transparent'
                      : 'border-border bg-background text-foreground hover:bg-accent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block rounded-2xl border-2 border-dashed border-border bg-card p-8 cursor-pointer hover:border-primary/50 transition-colors text-center">
          <input
            type="file"
            accept=".csv,.xlsx,.xls,.txt"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Upload size={20} className="text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {fileName ? `Uploaded: ${fileName}` : 'Click to upload a CSV or Excel file'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Required columns: <code className="font-mono">username</code>, <code className="font-mono">message</code>.
            Optional: <code className="font-mono">likes</code>, <code className="font-mono">time</code>, <code className="font-mono">isVerified</code>.
          </p>
        </label>

        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-3">
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              'username,message,likes,time,isVerified\nsarah_codes,"Loved this video!",1.2k,2h,true\nmark_design,"Pure gold","850","5h",false\n',
            )}`}
            download="commentcraft-bulk-template.csv"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            <FileSpreadsheet size={12} /> Download CSV template
          </a>
          <span>·</span>
          <span>Up to 200 rows per upload</span>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex items-start gap-2">
            <AlertCircle size={15} className="text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">{error}</p>
          </div>
        )}

        {rows.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">
                {rows.length} row{rows.length === 1 ? '' : 's'} parsed
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setRows([]);
                    setFileName(null);
                  }}
                  className="px-3 h-9 rounded-md border border-border bg-background text-sm text-foreground hover:bg-accent flex items-center gap-1.5"
                >
                  <Trash2 size={13} /> Clear
                </button>
                <button
                  onClick={generate}
                  disabled={busy}
                  className="px-4 h-9 rounded-md gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5 hover:opacity-90 disabled:opacity-60"
                >
                  {busy ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                  {busy
                    ? `Rendering ${progress?.done ?? 0} / ${progress?.total ?? 0}…`
                    : `Generate ZIP (${rows.length})`}
                </button>
              </div>
            </div>
            <div className="max-h-[280px] overflow-y-auto divide-y divide-border">
              {rows.slice(0, 50).map((r, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center gap-3 text-sm">
                  <span className="text-xs font-mono text-muted-foreground w-8 tabular-nums">{i + 1}</span>
                  <span className="font-semibold text-foreground w-36 truncate">{r.username}</span>
                  <span className="text-foreground/80 truncate flex-1">{r.message}</span>
                </div>
              ))}
              {rows.length > 50 && (
                <p className="px-4 py-2 text-xs text-muted-foreground bg-muted">
                  + {rows.length - 50} more rows…
                </p>
              )}
            </div>
          </div>
        )}

        {/* Off-screen render canvas */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            left: '-10000px',
            top: 0,
            width: 'auto',
            pointerEvents: 'none',
          }}
        >
          <div ref={renderRef}>
            {data && <PreviewFor platform={platform} data={data} />}
          </div>
        </div>
      </section>

      <UpgradeDialog
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        title="Upgrade required"
        message={upgradeMsg}
      />
    </SiteLayout>
  );
}

function normalizeRow(r: any): BulkRow {
  const lower = (k: string) => Object.keys(r).find((kk) => kk.trim().toLowerCase() === k);
  const get = (k: string) => {
    const key = lower(k);
    return key ? String(r[key] ?? '').trim() : '';
  };
  const verifiedRaw = get('isverified') || get('verified');
  return {
    username: get('username') || get('user') || get('name'),
    message: get('message') || get('comment') || get('text'),
    likes: get('likes') || undefined,
    time: get('time') || undefined,
    isVerified: ['true', '1', 'yes', 'y'].includes(verifiedRaw.toLowerCase()),
  };
}

function validRow(r: BulkRow) {
  return Boolean(r.username && r.message);
}

function subModeFor(p: Platform): string {
  if (p === 'tiktok') return 'video-comment';
  if (p === 'instagram') return 'post-comment';
  if (p === 'youtube') return 'video-comment';
  return 'post-reply';
}

function buildData(r: BulkRow, platform: Platform, theme: 'light' | 'dark') {
  return {
    ...defaultCommentData,
    platform,
    subMode: subModeFor(platform),
    username: r.username.toLowerCase().replace(/\s+/g, '_'),
    displayName: r.username,
    message: r.message,
    likes: r.likes ?? '0',
    time: (r.time ?? '2').replace(/[^0-9]/g, '') || '2',
    isVerified: !!r.isVerified,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(r.username)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
    previewTheme: theme,
  };
}
