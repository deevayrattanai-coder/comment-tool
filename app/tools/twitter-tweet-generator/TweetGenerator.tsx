"use client";
import { useState, useRef, useCallback } from "react";
import TweetPreview from "@/components/tweet-preview";
import TweetForm from "@/components/tweet-form";
import { TweetTheme } from "@/lib/suspension-types";
import { TweetData, defaultTweetData } from "@/lib/tweet-types";
import { downloadTweet } from "@/lib/download";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

function ThemeSelector({
  value,
  onChange,
}: {
  value: TweetTheme;
  onChange: (t: TweetTheme) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["light", "dim", "dark"] as TweetTheme[]).map((t) => {
        const bg = t === "dark" ? "#000" : t === "dim" ? "#15202b" : "#fff";
        const col = t === "light" ? "#0f1419" : "#e7e9ea";
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`flex-1 py-1 px-2 rounded-xl border-2 text-xs font-medium transition-all capitalize ${value === t ? "border-primary" : "border-border"}`}
            style={{ backgroundColor: bg, color: col }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default function TweetGenerator() {
  const [tweetData, setTweetData] = useState<TweetData>(defaultTweetData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      // 🔐 Check login
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.user) {
        toast.error("Please login to download");
        setDownloading(false);
        return;
      }
      await downloadTweet(previewRef.current, tweetData.theme);
      toast.success("Tweet image saved successfully!");
    } finally {
      setDownloading(false);
    }
  }, [tweetData.theme]);

  const copyImage = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      // 🔐 Check auth
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user) {
        toast.error("Please login to copy image");
        return;
      }

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          toast.success("Image copied to clipboard!");
        }
      });
    } catch (err) {
      toast.error("Copy failed");
    }
  }, [tweetData.theme]);
  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-6 flex justify-center itmes-center max-md:flex-col max-md:gap-6 ">
        <aside className="lg:sticky lg:top-20 lg:self-start ">
          <div className="bg-card border border-border rounded-l-2xl overflow-hidden">
            <TweetForm tweetData={tweetData} onChange={setTweetData} />
            <div className="flex items-center gap-2 justify-center p-4 ">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1  h-9 gradient-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
              >
                <Download size={13} />
                Export Image
              </button>

              <button
                onClick={copyImage}
                className="flex-1 h-9 glass-panel text-sidebar-text rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-sidebar-surface transition-all"
              >
                <Copy size={13} />
                Copy
              </button>
            </div>
          </div>
        </aside>

        <div className="lg:w-[700px] w-full lg:sticky lg:top-20 lg:self-start">
          <div className="flex rounded-tr-2xl items-center justify-between px-4 py-3 border-b border-border bg-card backdrop-blur-sm">
            <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
              Preview
            </span>
            <div className="flex gap-3">
              <ThemeSelector
                value={tweetData.theme}
                onChange={(theme) => setTweetData({ ...tweetData, theme })}
              />
            </div>
          </div>
          <main className="flex flex-col items-center justify-start gap-4">
            <div
              className={`w-full rounded-tb-2xl p-8 flex flex-col items-center justify-center transition-colors duration-300 bg-gray-200 dark-grid-dots`}
            >
              <TweetPreview ref={previewRef} tweetData={tweetData} />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              For entertainment purposes only. Not affiliated with X Corp.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
