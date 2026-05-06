"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  User,
  Upload,
  Clock,
  Heart,
  MessageCircle,
  Highlighter,
  EyeOff,
  Scissors,
  RotateCcw,
  Download,
  Copy,
  Sun,
  Moon,
  Repeat2,
  BarChart3,
  BadgeCheck,
  Shuffle,
  Plus,
  Trash2,
  ArrowUp,
  FileText,
  Crown,
} from "lucide-react";
import {
  CommentData,
  Platform,
  SubMode,
  platformSubModes,
  defaultCommentData,
} from "@/types/comment";
import { useAuth } from "./AuthProvider";
import LoginRequiredDialog from "./LoginRequiredDialog";
import UpgradeDialog from "./UpgradeDialog";
import { useRouter } from "next/navigation";
import TikTokCommentReply from "./previews/TikTokCommentReply";
import TikTokVideoComment from "./previews/TikTokVideoComment";
import InstagramPostComment from "./previews/InstagramPostComment";
import InstagramReelsComment from "./previews/InstagramReelsComment";
import YouTubeVideoComment from "./previews/YouTubeVideoComment";
import YouTubeShortsComment from "./previews/YouTubeShortsComment";
import TwitterPostComment from "./previews/TwitterPostComment";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import Papa from "papaparse";
import JSZip from "jszip";

const platformIcons: Record<Platform, React.ReactNode> = {
  tiktok: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.42-.01 6.83-.02 10.25-.17 4.14-4.23 7.25-8.26 6.5-3.91-.6-6.51-4.74-5.16-8.48 1.05-3.15 4.75-4.88 7.74-3.83.15.05.3.11.44.18v4.11c-.95-.41-2.06-.46-3.03-.09-1.57.55-2.5 2.37-1.92 3.93.5 1.52 2.27 2.37 3.75 1.83 1.25-.4 1.9-1.74 1.87-3.01-.01-5.3-.01-10.6-.01-15.91z" />
    </svg>
  ),
  instagram: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  twitter: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
};

const maleProfiles = [
  "James",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Daniel",
  "Matthew",
  "Chris",
  "Andrew",
  "Ryan",
  "Nathan",
  "Alex",
].map((name) => ({ name }));
const femaleProfiles = [
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Barbara",
  "Elizabeth",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
  "Emily",
  "Ashley",
  "Sophia",
  "Olivia",
  "Emma",
].map((name) => ({ name }));

const dicebearAvatar = (
  seed: string,
  style: "avataaars" | "initials" | "micah" = "avataaars",
) =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

const celebrityProfiles = [
  { name: "Elon Musk", handle: "elonmusk" },
  { name: "Taylor Swift", handle: "taylorswift13" },
  { name: "Drake", handle: "Drake" },
  { name: "MrBeast", handle: "MrBeast" },
  { name: "Cristiano Ronaldo", handle: "Cristiano" },
  { name: "Kylie Jenner", handle: "KylieJenner" },
  { name: "Selena Gomez", handle: "selenagomez" },
  { name: "Kim Kardashian", handle: "KimKardashian" },
  { name: "Virat Kohli", handle: "imVkohli" },
  { name: "Neymar Jr", handle: "neymarjr" },
  { name: "Justin Bieber", handle: "justinbieber" },
  { name: "Ariana Grande", handle: "ArianaGrande" },
  { name: "Dwayne Johnson", handle: "TheRock" },
  { name: "Beyoncé", handle: "Beyonce" },
  { name: "LeBron James", handle: "KingJames" },
  { name: "Rihanna", handle: "rihanna" },
  { name: "Katy Perry", handle: "katyperry" },
  { name: "Lionel Messi", handle: "TeamMessi" },
  { name: "Narendra Modi", handle: "narendramodi" },
  { name: "PewDiePie", handle: "pewdiepie" },
  { name: "Khaby Lame", handle: "KhabyLame" },
  { name: "Zendaya", handle: "Zendaya" },
  { name: "Bad Bunny", handle: "sanbenito" },
  { name: "Billie Eilish", handle: "billieeilish" },
  { name: "Travis Scott", handle: "trvisXX" },
  { name: "Shakira", handle: "shakira" },
  { name: "Tom Holland", handle: "TomHolland1996" },
  { name: "Zach King", handle: "zachking" },
  { name: "Charli D'Amelio", handle: "charlidamelio" },
  { name: "Addison Rae", handle: "whoisaddison" },
  { name: "Will Smith", handle: "willsmith" },
  { name: "Kevin Hart", handle: "KevinHart4real" },
  { name: "Snoop Dogg", handle: "SnoopDogg" },
  { name: "Cardi B", handle: "iamcardib" },
  { name: "Post Malone", handle: "PostMalone" },
  { name: "Dua Lipa", handle: "DUALIPA" },
  { name: "Chris Hemsworth", handle: "chrishemsworth" },
  { name: "Gal Gadot", handle: "GalGadot" },
  { name: "Ryan Reynolds", handle: "VancityReynolds" },
  { name: "Mark Zuckerberg", handle: "finkd" },
  { name: "Oprah Winfrey", handle: "Oprah" },
  { name: "Emma Watson", handle: "EmmaWatson" },
  { name: "Jennifer Lopez", handle: "JLo" },
  { name: "Lady Gaga", handle: "ladygaga" },
  { name: "Kendall Jenner", handle: "KendallJenner" },
  { name: "Gigi Hadid", handle: "GiGiHadid" },
  { name: "Lewis Hamilton", handle: "LewisHamilton" },
  { name: "Conor McGregor", handle: "TheNotoriousMMA" },
  { name: "MS Dhoni", handle: "msdhoni" },
  { name: "Sachin Tendulkar", handle: "sachin_rt" },
];

interface BulkComment {
  id: string;
  username: string;
  message: string;
  likes: string;
  time: string;
  timeUnit: string;
  isVerified: boolean;
  avatarUrl: string | null;
}

const createBulkComment = (): BulkComment => ({
  id: Math.random().toString(36).slice(2),
  username: "",
  message: "",
  likes: String(Math.floor(Math.random() * 5000) + 10),
  time: String(Math.floor(Math.random() * 12) + 1),
  timeUnit: ["hrs", "days", "wks", "months"][Math.floor(Math.random() * 4)],
  isVerified: false,
  avatarUrl: null,
});

const PAID_PLANS = ["monthly", "annual", "pro", "business"];

const CommentTool = ({
  initialPlatform,
}: { initialPlatform?: Platform } = {}) => {
  const initialSub = initialPlatform
    ? platformSubModes[initialPlatform][0].value
    : defaultCommentData.subMode;
  const [data, setData] = useState<CommentData>({
    ...defaultCommentData,
    platform: initialPlatform ?? defaultCommentData.platform,
    subMode: initialSub,
  });
  const [editHistory, setEditHistory] = useState<string[]>([
    defaultCommentData.message,
  ]);
  const previewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvImportRef = useRef<HTMLInputElement>(null);
  const bulkRenderRef = useRef<HTMLDivElement>(null);
  const [savedSelection, setSavedSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [showRandomMenu, setShowRandomMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const randomMenuRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [bulkComments, setBulkComments] = useState<BulkComment[]>([
    createBulkComment(),
    createBulkComment(),
    createBulkComment(),
  ]);
  const [activeBulkId, setActiveBulkId] = useState<string | null>(null);
  const [bulkRenderRow, setBulkRenderRow] = useState<BulkComment | null>(null);
  const [bulkExportProgress, setBulkExportProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);

  const { user } = useAuth();
  const router = useRouter();
  const [showLoginGate, setShowLoginGate] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeMsg, setUpgradeMsg] = useState<string | undefined>(undefined);

  const checkAndLogExport = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setShowLoginGate(true);
      return false;
    }
    try {
      const r = await fetch("/api/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: data.platform,
          subMode: data.subMode,
          mode: "single",
          count: 1,
        }),
      });
      if (r.status === 401) {
        toast.error("You must be logged in to export images.");
        setShowLoginGate(true);
        return false;
      }
      const body = await r.json();
      if (!r.ok) {
        if (body?.upgrade) {
          setUpgradeMsg(body.error);
          setShowUpgrade(true);
        } else {
          alert(body?.error ?? "Export failed");
        }
        return false;
      }
      toast.success("Export logged successfully");
      return true;
    } catch {
      toast.error("Could not log export. Please try again in a moment.");
      return false;
    }
  }, [user, data.platform, data.subMode]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        randomMenuRef.current &&
        !randomMenuRef.current.contains(e.target as Node)
      ) {
        setShowRandomMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const update = useCallback((partial: Partial<CommentData>) => {
    setData((prev) => {
      const next = { ...prev, ...partial };
      if (partial.message !== undefined) {
        setEditHistory((h) => [...h, partial.message!]);
      }
      return next;
    });
  }, []);

  const syncActiveBulkRow = useCallback(
    (partial: Partial<BulkComment>) => {
      if (!activeBulkId) return;
      setBulkComments((prev) =>
        prev.map((c) => (c.id === activeBulkId ? { ...c, ...partial } : c)),
      );
    },
    [activeBulkId],
  );

  const randomize = useCallback(
    (type: "male" | "female" | "celebrity") => {
      if (type === "celebrity") {
        const profile =
          celebrityProfiles[
            Math.floor(Math.random() * celebrityProfiles.length)
          ];
        const name = profile.name;
        const seed = name.replace(/\s/g, "");
        update({
          username: profile.handle.toLowerCase(),
          displayName: name,
          avatarSeed: seed,
        });
        setAvatarUrl(dicebearAvatar(profile.handle, "avataaars"));
      } else {
        const pool = type === "male" ? maleProfiles : femaleProfiles;
        const profile = pool[Math.floor(Math.random() * pool.length)];
        const name = profile.name;
        const seed = name.replace(/\s/g, "");
        update({
          username: name.toLowerCase().replace(/\s/g, ""),
          displayName: name,
          avatarSeed: seed,
        });
        setAvatarUrl(dicebearAvatar(seed, "avataaars"));
      }
      setShowRandomMenu(false);
    },
    [update],
  );

  const randomizeStats = useCallback(() => {
    const timeVal = Math.floor(Math.random() * 12) + 1;
    const timeUnits = ["hrs", "days", "wks", "months"];
    const timeUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
    const likesNum = Math.floor(Math.random() * 50000) + 100;
    const likes =
      likesNum > 999 ? `${(likesNum / 1000).toFixed(1)}K` : String(likesNum);
    const repliesNum = Math.floor(Math.random() * 500) + 1;
    const replies =
      repliesNum > 999
        ? `${(repliesNum / 1000).toFixed(1)}K`
        : String(repliesNum);
    const retweetsNum = Math.floor(Math.random() * 10000) + 10;
    const retweets =
      retweetsNum > 999
        ? `${(retweetsNum / 1000).toFixed(1)}K`
        : String(retweetsNum);
    const viewsNum = Math.floor(Math.random() * 500000) + 1000;
    const views =
      viewsNum > 999 ? `${(viewsNum / 1000).toFixed(1)}K` : String(viewsNum);
    update({
      time: String(timeVal),
      timeUnit,
      likes,
      replies,
      retweets,
      views,
    });
  }, [update]);

  const handleAvatarUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
      }
    },
    [],
  );

  const loadBulkRow = useCallback(
    (bc: BulkComment) => {
      setActiveBulkId(bc.id);
      update({
        username: bc.username || "username",
        message: bc.message || "Write any comment and see what happens 😊",
        likes: bc.likes,
        time: bc.time,
        timeUnit: bc.timeUnit,
        isVerified: bc.isVerified,
      });
      setAvatarUrl(bc.avatarUrl);
    },
    [update],
  );

  const randomizeBulkAvatar = useCallback(
    (id: string) => {
      const pool = Math.random() > 0.5 ? maleProfiles : femaleProfiles;
      const profile = pool[Math.floor(Math.random() * pool.length)];
      const url = dicebearAvatar(profile.name, "avataaars");
      setBulkComments((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                avatarUrl: url,
                username: c.username || profile.name.toLowerCase(),
              }
            : c,
        ),
      );
      if (activeBulkId === id) {
        setAvatarUrl(url);
        update({ username: profile.name.toLowerCase() });
      }
    },
    [activeBulkId, update],
  );

  const uploadBulkAvatar = useCallback(
    (id: string, file: File) => {
      const url = URL.createObjectURL(file);
      setBulkComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, avatarUrl: url } : c)),
      );
      if (activeBulkId === id) setAvatarUrl(url);
    },
    [activeBulkId],
  );

  useEffect(() => {
    if (mode === "bulk" && !activeBulkId && bulkComments.length > 0) {
      loadBulkRow(bulkComments[0]);
    }
  }, [mode]);

  const handleCsvImport = useCallback((file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["csv", "txt"].includes(ext ?? "")) {
      toast.error("Please upload a .csv or .txt file");
      return;
    }
    file.text().then((text) => {
      const out = Papa.parse(text, { header: true, skipEmptyLines: true });
      const rows = (out.data as any[])
        .map((r: any) => {
          const lower = (k: string) =>
            Object.keys(r).find((kk) => kk.trim().toLowerCase() === k);
          const get = (k: string) => {
            const key = lower(k);
            return key ? String(r[key] ?? "").trim() : "";
          };
          const verifiedRaw = get("isverified") || get("verified");
          return {
            username: get("username") || get("user") || get("name"),
            message: get("message") || get("comment") || get("text"),
            likes:
              get("likes") || String(Math.floor(Math.random() * 5000) + 10),
            time: (get("time") || "2").replace(/[^0-9]/g, "") || "2",
            isVerified: ["true", "1", "yes", "y"].includes(
              verifiedRaw.toLowerCase(),
            ),
          };
        })
        .filter((r: any) => r.username && r.message)
        .slice(0, 200);

      if (rows.length === 0) {
        toast.error(
          "No valid rows found. File must have username and message columns.",
        );
        return;
      }
      const newComments: BulkComment[] = rows.map((r: any) => ({
        ...createBulkComment(),
        username: r.username,
        message: r.message,
        likes: r.likes,
        time: r.time,
        isVerified: r.isVerified,
      }));
      setBulkComments(newComments);
      toast.success(`Imported ${newComments.length} rows from CSV`);
    });
  }, []);

  const downloadAllBulk = useCallback(async () => {
    if (!user) {
      setShowLoginGate(true);
      return;
    }
    const plan = (user as any).plan as string;
    if (!PAID_PLANS.includes(plan)) {
      setUpgradeMsg(
        "Download ALL requires a Monthly or Annual plan. Upgrade to export bulk ZIP.",
      );
      setShowUpgrade(true);
      return;
    }
    if (bulkComments.length === 0) return;

    try {
      const pre = await fetch("/api/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: data.platform,
          subMode: data.subMode,
          mode: "bulk",
          count: bulkComments.length,
        }),
      });
      if (pre.status === 401) {
        setShowLoginGate(true);
        return;
      }
      const preData = await pre.json();
      if (!pre.ok) {
        if (preData.upgrade) {
          setUpgradeMsg(preData.error);
          setShowUpgrade(true);
        } else {
          toast.error(preData.error ?? "Export failed");
        }
        return;
      }
    } catch {
      toast.error("Could not start export. Please try again.");
      return;
    }

    const zip = new JSZip();
    for (let i = 0; i < bulkComments.length; i++) {
      const bc = bulkComments[i];
      setBulkRenderRow(bc);
      setBulkExportProgress({ done: i, total: bulkComments.length });
      await new Promise((res) =>
        requestAnimationFrame(() => requestAnimationFrame(res)),
      );
      if (bulkRenderRef.current) {
        const canvas = await html2canvas(bulkRenderRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        const blob: Blob = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b!), "image/png"),
        );
        const safeName = (bc.username || `row-${i + 1}`).replace(
          /[^a-z0-9_-]/gi,
          "_",
        );
        zip.file(`${String(i + 1).padStart(3, "0")}_${safeName}.png`, blob);
      }
    }
    setBulkRenderRow(null);
    setBulkExportProgress(null);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comments-${data.platform}-bulk.zip`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${bulkComments.length} comment images as ZIP`);
  }, [user, bulkComments, data.platform, data.subMode]);

  const exportImage = useCallback(async () => {
    if (!previewRef.current) return;
    const ok = await checkAndLogExport();
    if (!ok) return;
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `comment-${data.platform}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [data.platform, checkAndLogExport]);

  const copyImage = useCallback(async () => {
    if (!previewRef.current) return;
    const ok = await checkAndLogExport();
    if (!ok) return;
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2,
    });
    canvas.toBlob(async (blob) => {
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      }
    });
  }, [checkAndLogExport]);

  const handleTextSelect = useCallback(() => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      if (start !== end) {
        setSavedSelection({ start, end });
      }
    }
  }, []);

  const handleTextBlur = useCallback(() => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      if (start !== end) {
        setSavedSelection({ start, end });
      }
    }
  }, []);

  const handlePreviewMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    const selectedText = sel.toString();
    if (!selectedText) return;
    const msg = data.message;
    const idx = msg.indexOf(selectedText);
    if (idx !== -1) {
      setSavedSelection({ start: idx, end: idx + selectedText.length });
    }
  }, [data.message]);

  const handleAdvancedEdit = useCallback(
    (mode: "highlight" | "blur" | "cut") => {
      const sel = savedSelection;
      if (!sel || sel.start === sel.end) {
        alert(
          "Please select some text in the message box or preview, then click the button.",
        );
        return;
      }
      const newAnnotation = {
        type: mode as "highlight" | "blur" | "cut",
        start: sel.start,
        end: sel.end,
      };
      const filtered = data.annotations.filter(
        (a) => a.type !== mode || a.end <= sel.start || a.start >= sel.end,
      );
      update({ annotations: [...filtered, newAnnotation] } as any);
      setSavedSelection(null);
    },
    [data.annotations, savedSelection, update],
  );

  const handleUndo = useCallback(() => {
    if (data.annotations.length > 0) {
      update({ annotations: data.annotations.slice(0, -1) } as any);
    } else if (editHistory.length > 1) {
      const newHistory = editHistory.slice(0, -1);
      setEditHistory(newHistory);
      setData((prev) => ({
        ...prev,
        message: newHistory[newHistory.length - 1],
        annotations: [],
      }));
    }
  }, [editHistory, data.annotations, update]);

  const subModes = platformSubModes[data.platform];
  const showMetrics = !(
    (data.platform === "tiktok" && data.subMode === "comment-reply") ||
    (data.platform === "instagram" && data.subMode === "reels-comment") ||
    (data.platform === "youtube" && data.subMode === "shorts-comment")
  );
  const showBadge =
    showMetrics ||
    (data.platform === "tiktok" && data.subMode === "comment-reply");
  const isTwitter = data.platform === "twitter";

  const renderPreview = () => {
    const props = { data, avatarUrl };
    if (data.platform === "tiktok") {
      return data.subMode === "comment-reply" ? (
        <TikTokCommentReply {...props} />
      ) : (
        <TikTokVideoComment {...props} />
      );
    }
    if (data.platform === "instagram") {
      return data.subMode === "post-comment" ? (
        <InstagramPostComment {...props} />
      ) : (
        <InstagramReelsComment {...props} />
      );
    }
    if (data.platform === "youtube") {
      return data.subMode === "video-comment" ? (
        <YouTubeVideoComment {...props} />
      ) : (
        <YouTubeShortsComment {...props} />
      );
    }
    return <TwitterPostComment {...props} />;
  };

  const renderPreviewForRow = (bc: BulkComment) => {
    const rowData: CommentData = {
      ...data,
      username: bc.username || "username",
      displayName: bc.username || "Username",
      message: bc.message || "Write any comment and see what happens 😊",
      likes: bc.likes,
      time: bc.time,
      timeUnit: bc.timeUnit,
      isVerified: bc.isVerified,
      annotations: [],
    };
    const rowAvatarUrl = bc.avatarUrl;
    const props = { data: rowData, avatarUrl: rowAvatarUrl };
    if (data.platform === "tiktok") {
      return data.subMode === "comment-reply" ? (
        <TikTokCommentReply {...props} />
      ) : (
        <TikTokVideoComment {...props} />
      );
    }
    if (data.platform === "instagram") {
      return data.subMode === "post-comment" ? (
        <InstagramPostComment {...props} />
      ) : (
        <InstagramReelsComment {...props} />
      );
    }
    if (data.platform === "youtube") {
      return data.subMode === "video-comment" ? (
        <YouTubeVideoComment {...props} />
      ) : (
        <YouTubeShortsComment {...props} />
      );
    }
    return <TwitterPostComment {...props} />;
  };

  const ModeToggle = (
    <div className="glass-panel rounded-lg p-0.5 flex gap-0.5 w-full">
      <button
        onClick={() => setMode("single")}
        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
          mode === "single"
            ? "gradient-primary text-primary-foreground shadow-sm"
            : "text-sidebar-text-muted hover:text-sidebar-text"
        }`}
      >
        <span className="text-xs">📄</span> Single Mode
      </button>
      <button
        onClick={() => setMode("bulk")}
        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
          mode === "bulk"
            ? "gradient-primary text-primary-foreground shadow-sm"
            : "text-sidebar-text-muted hover:text-sidebar-text"
        }`}
      >
        <span className="text-xs">📊</span> Bulk Mode
      </button>
    </div>
  );

  const Dialogs = (
    <>
      <LoginRequiredDialog
        open={showLoginGate}
        onClose={() => setShowLoginGate(false)}
      />
      <UpgradeDialog
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        message={upgradeMsg}
      />
    </>
  );

  if (mode === "bulk") {
    const isPaid = user && PAID_PLANS.includes((user as any).plan as string);
    const isBulkExporting = bulkExportProgress !== null;

    return (
      <div className="min-h-[calc(100vh-3.5rem)] px-2 sm:px-6 lg:px-16 xl:px-32 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-3.5rem-2rem)] lg:h-[calc(100vh-3.5rem-3rem)] max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-elevated border border-border">
          {/* LEFT PANEL — preview + platform + comment controls */}
          <aside className="w-full lg:w-[300px] flex-shrink-0 bg-sidebar-bg flex flex-col overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
            <div className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-thin">
              {ModeToggle}

              {/* Live Preview */}

              {/* Platform */}
              <div className="flex flex-col gap-2 mt-5">
                <label className="text-[10px] font-bold text-sidebar-text-muted uppercase tracking-wider">
                  Platform
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    ["tiktok", "instagram", "youtube", "twitter"] as Platform[]
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const newSub = platformSubModes[p][0].value;
                        update({ platform: p, subMode: newSub });
                      }}
                      className={`h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        data.platform === p
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"
                      }`}
                    >
                      {platformIcons[p]}
                    </button>
                  ))}
                </div>
                <div
                  className={`grid gap-1.5 ${subModes.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                >
                  {subModes.map((sm) => (
                    <button
                      key={sm.value}
                      onClick={() => update({ subMode: sm.value })}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                        data.subMode === sm.value
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"
                      }`}
                    >
                      {sm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Controls for active row */}
              <div className="flex flex-col gap-2 mt-5">
                <label className="text-[10px] font-bold text-sidebar-text-muted uppercase tracking-wider">
                  Comment Controls
                  {activeBulkId && (
                    <span className="ml-1.5 text-primary normal-case font-normal">
                      (active row)
                    </span>
                  )}
                </label>
                <div className="flex gap-1.5 items-center">
                  <div className="flex-1 relative">
                    <User
                      size={12}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted"
                    />
                    <input
                      type="text"
                      value={data.username}
                      onChange={(e) => {
                        update({ username: e.target.value });
                        syncActiveBulkRow({ username: e.target.value });
                      }}
                      placeholder="username"
                      className="w-full h-8 pl-7 pr-7 rounded-lg glass-input text-xs"
                    />
                    <Upload
                      size={11}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted cursor-pointer hover:text-sidebar-text"
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  {isTwitter && (
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted text-xs">
                        @
                      </span>
                      <input
                        type="text"
                        value={data.displayName}
                        onChange={(e) =>
                          update({ displayName: e.target.value })
                        }
                        placeholder="Display Name"
                        className="w-full h-8 pl-7 pr-2 rounded-lg glass-input text-xs"
                      />
                    </div>
                  )}
                  {showBadge && (
                    <button
                      onClick={() => {
                        update({ isVerified: !data.isVerified });
                        syncActiveBulkRow({ isVerified: !data.isVerified });
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        data.isVerified
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"
                      }`}
                      title="Toggle verified badge"
                    >
                      <BadgeCheck size={13} />
                    </button>
                  )}
                  <div className="relative" ref={randomMenuRef}>
                    <button
                      onClick={() => setShowRandomMenu(!showRandomMenu)}
                      className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-sidebar-text-muted hover:text-sidebar-text transition-colors flex-shrink-0"
                      title="Generate Random Identity"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                      </svg>
                    </button>
                    {showRandomMenu && (
                      <div className="absolute top-full right-0 mt-1 w-36 rounded-lg glass-panel shadow-elevated z-50 py-1 border border-sidebar-border">
                        <button
                          onClick={() => randomize("male")}
                          className="w-full px-3 py-2 text-left text-xs text-sidebar-text hover:bg-sidebar-surface flex items-center gap-2"
                        >
                          <span>👨</span> Male
                        </button>
                        <button
                          onClick={() => randomize("female")}
                          className="w-full px-3 py-2 text-left text-xs text-sidebar-text hover:bg-sidebar-surface flex items-center gap-2"
                        >
                          <span>👩</span> Female
                        </button>
                        <button
                          onClick={() => randomize("celebrity")}
                          className="w-full px-3 py-2 text-left text-xs text-sidebar-accent hover:bg-sidebar-surface flex items-center gap-2"
                        >
                          <span>✨</span> Celebrity
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {showMetrics && (
                  <div className="flex gap-1.5 flex-wrap items-center">
                    <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                      <Clock size={11} className="text-sidebar-text-muted" />
                      <input
                        type="text"
                        value={data.time}
                        onChange={(e) => {
                          update({ time: e.target.value });
                          syncActiveBulkRow({ time: e.target.value });
                        }}
                        className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                      />
                      <select
                        value={data.timeUnit}
                        onChange={(e) => {
                          update({ timeUnit: e.target.value });
                          syncActiveBulkRow({ timeUnit: e.target.value });
                        }}
                        className="bg-transparent text-sidebar-text-muted text-[10px] cursor-pointer"
                      >
                        <option value="hrs">hrs</option>
                        <option value="days">days</option>
                        <option value="wks">wks</option>
                        <option value="months">months</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                      <Heart size={11} className="text-pink-400" />
                      <input
                        type="text"
                        value={data.likes}
                        onChange={(e) => {
                          update({ likes: e.target.value });
                          syncActiveBulkRow({ likes: e.target.value });
                        }}
                        className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                      />
                    </div>
                    <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                      <MessageCircle
                        size={11}
                        className="text-sidebar-text-muted"
                      />
                      <input
                        type="text"
                        value={data.replies}
                        onChange={(e) => update({ replies: e.target.value })}
                        className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                      />
                    </div>
                    {isTwitter && (
                      <>
                        <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                          <Repeat2
                            size={11}
                            className="text-sidebar-text-muted"
                          />
                          <input
                            type="text"
                            value={data.retweets}
                            onChange={(e) =>
                              update({ retweets: e.target.value })
                            }
                            className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                          />
                        </div>
                        <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                          <BarChart3
                            size={11}
                            className="text-sidebar-text-muted"
                          />
                          <input
                            type="text"
                            value={data.views}
                            onChange={(e) => update({ views: e.target.value })}
                            className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                          />
                        </div>
                      </>
                    )}
                    <button
                      onClick={randomizeStats}
                      className="w-7 h-7 rounded-lg glass-panel flex items-center justify-center text-sidebar-text-muted hover:text-sidebar-text transition-colors flex-shrink-0"
                      title="Randomize stats"
                    >
                      <Shuffle size={11} />
                    </button>
                  </div>
                )}
              </div>

              {/* Theme toggle */}

              {/* Download ALL — paid only */}
              <div className="flex mt-auto flex-col gap-1.5">
                <div className="flex flex-col gap-1.5">
                  {activeBulkId && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={exportImage}
                        className="flex-1 h-7 gradient-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 hover:opacity-90 transition-all active:scale-[0.98]"
                      >
                        <Download size={10} /> Export
                      </button>
                      <button
                        onClick={copyImage}
                        className="flex-1 h-7 glass-panel text-sidebar-text rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-sidebar-surface transition-all"
                      >
                        <Copy size={10} /> Copy
                      </button>
                    </div>
                  )}
                </div>

                {!isPaid && (
                  <p className="text-[9px] text-sidebar-text-muted text-center">
                    Monthly &amp; Annual plans can export ZIP
                  </p>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL — table of rows */}
          <section className="flex-1 bg-canvas-bg grid-dots flex flex-col overflow-hidden min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-gradient-primary backdrop-blur-sm">
              <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Preview
              </span>
              <button
                onClick={() =>
                  update({
                    previewTheme:
                      data.previewTheme === "light" ? "dark" : "light",
                  })
                }
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  data.previewTheme === "dark"
                    ? "bg-[hsl(240,5%,20%)] border-[hsl(240,5%,30%)] text-[hsl(240,5%,70%)] hover:text-white"
                    : "border-border text-foreground/50 hover:text-foreground"
                }`}
                title={
                  data.previewTheme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
              >
                {data.previewTheme === "light" ? (
                  <Moon size={14} />
                ) : (
                  <Sun size={14} />
                )}
              </button>
            </div>
            <div
              className={`flex items-center justify-center  overflow-hidden min-h-[140px] ${
                data.previewTheme === "dark"
                  ? "bg-gray-200  dark-grid-dots"
                  : "bg-gray-200  dark-grid-dots"
              }`}
            >
              {activeBulkId ? (
                <div
                  ref={previewRef}
                  className="transform scale-[0.72] origin-center"
                  style={{ transformOrigin: "center center" }}
                >
                  {renderPreview()}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-4 px-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-sidebar-surface flex items-center justify-center">
                    <MessageCircle
                      size={14}
                      className="text-sidebar-text-muted"
                    />
                  </div>
                  <p className="text-[11px] text-sidebar-text-muted leading-tight">
                    Click any row on the right to preview it here
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-border bg-card flex-wrap gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() =>
                    setBulkComments((prev) => [...prev, createBulkComment()])
                  }
                  className="h-8 px-3 rounded-lg gradient-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <Plus size={13} /> New Row
                </button>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {bulkComments.length}{" "}
                  {bulkComments.length === 1 ? "comment" : "comments"}
                </span>

                <div className="h-6 w-px bg-sidebar-border hidden sm:block" />

                {/* CSV Import */}
                <button
                  onClick={() => csvImportRef.current?.click()}
                  className="h-8 px-3 rounded-lg glass-panel text-sidebar-text text-xs font-semibold flex items-center gap-1.5 hover:bg-sidebar-surface transition-all"
                  title="Import rows from CSV"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M12 12v6" />
                    <path d="m15 15-3-3-3 3" />
                  </svg>
                  Import
                </button>

                <div className="relative group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-question-mark w-4 h-4 cursor-help text-gray-500"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 bg-gray-800 text-gray-200 border border-white/10">
                    Import CSV/Excel files
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>

                <input
                  ref={csvImportRef}
                  type="file"
                  accept=".csv,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCsvImport(file);
                    e.target.value = "";
                  }}
                />

                {/* CSV Template download */}
                <a
                  href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                    "username,message,likes,time,isVerified\nsarah_codes,Loved this video!,1.2k,2h,true\nmark_design,Pure gold,850,5h,false\n",
                  )}`}
                  download="comment-tools-bulk-template.csv"
                  className="h-8 px-2.5 rounded-lg glass-panel text-sidebar-text text-xs font-semibold flex items-center gap-1.5 hover:bg-sidebar-surface transition-all"
                  title="Download CSV template"
                >
                  <FileText size={12} />
                  <span className="hidden sm:inline">Template</span>
                </a>
              </div>

              {/* Download ALL — right-aligned shortcut */}
              <button
                onClick={downloadAllBulk}
                disabled={isBulkExporting || bulkComments.length === 0}
                className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-60 ${
                  isPaid
                    ? "gradient-primary text-primary-foreground hover:opacity-90 shadow-sm"
                    : "border border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                {isPaid ? (
                  <Download size={12} />
                ) : (
                  <Crown size={12} className="text-yellow-500" />
                )}
                {isBulkExporting
                  ? `${bulkExportProgress?.done ?? 0}/${bulkExportProgress?.total ?? 0}…`
                  : "Download ALL"}
              </button>
            </div>

            {/* CSV hint */}
            <div className="px-4 py-1.5 border-b border-border bg-card/60 text-[10px] text-muted-foreground flex items-center gap-1.5">
              <span>CSV columns:</span>
              <code className="font-mono bg-muted px-1 rounded">username</code>
              <code className="font-mono bg-muted px-1 rounded">message</code>
              <span className="text-muted-foreground/60">optional:</span>
              <code className="font-mono bg-muted px-1 rounded">likes</code>
              <code className="font-mono bg-muted px-1 rounded">time</code>
              <code className="font-mono bg-muted px-1 rounded">
                isVerified
              </code>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto scrollbar-thin bg-card">
              <table className="w-full text-xs min-w-[480px]">
                <thead className="sticky top-0 bg-card z-10">
                  <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <th className="text-left px-3 py-2.5 w-[120px]">User</th>
                    <th className="text-left px-3 py-2.5">Comment</th>
                    <th className="text-center px-2 py-2.5 w-[44px]">✓</th>
                    <th className="text-center px-2 py-2.5 w-[110px]">
                      Avatar
                    </th>
                    <th className="text-center px-2 py-2.5 w-[44px]" />
                  </tr>
                </thead>
                <tbody>
                  {bulkComments.map((bc) => {
                    const isActive = activeBulkId === bc.id;
                    return (
                      <tr
                        key={bc.id}
                        onClick={() => loadBulkRow(bc)}
                        className={`border-b border-border cursor-pointer transition-colors ${
                          isActive
                            ? "bg-primary/5 ring-1 ring-inset ring-primary/20"
                            : "hover:bg-accent/40"
                        }`}
                      >
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={bc.username}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBulkComments((prev) =>
                                prev.map((c) =>
                                  c.id === bc.id ? { ...c, username: val } : c,
                                ),
                              );
                              if (isActive) update({ username: val });
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isActive) loadBulkRow(bc);
                            }}
                            placeholder="username"
                            className="w-full h-8 px-2.5 rounded-md border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={bc.message}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBulkComments((prev) =>
                                prev.map((c) =>
                                  c.id === bc.id ? { ...c, message: val } : c,
                                ),
                              );
                              if (isActive) update({ message: val });
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isActive) loadBulkRow(bc);
                            }}
                            placeholder="Type a comment..."
                            className="w-full h-8 px-2.5 rounded-md border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const next = !bc.isVerified;
                              setBulkComments((prev) =>
                                prev.map((c) =>
                                  c.id === bc.id
                                    ? { ...c, isVerified: next }
                                    : c,
                                ),
                              );
                              if (isActive) update({ isVerified: next });
                            }}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-all mx-auto ${
                              bc.isVerified
                                ? "gradient-primary text-primary-foreground shadow-sm"
                                : "border border-border bg-background text-muted-foreground hover:text-foreground"
                            }`}
                            title={bc.isVerified ? "Verified" : "Mark verified"}
                          >
                            <BadgeCheck size={13} />
                          </button>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-background flex items-center justify-center flex-shrink-0">
                              {bc.avatarUrl ? (
                                <img
                                  src={bc.avatarUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  crossOrigin="anonymous"
                                />
                              ) : (
                                <User
                                  size={13}
                                  className="text-muted-foreground"
                                />
                              )}
                            </div>
                            <label
                              onClick={(e) => e.stopPropagation()}
                              className="w-7 h-7 rounded-md border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                              title="Upload avatar"
                            >
                              <ArrowUp size={11} />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) uploadBulkAvatar(bc.id, file);
                                }}
                              />
                            </label>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                randomizeBulkAvatar(bc.id);
                              }}
                              className="w-7 h-7 rounded-md border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                              title="Random avatar"
                            >
                              <Shuffle size={11} />
                            </button>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBulkComments((prev) => {
                                const next = prev.filter((c) => c.id !== bc.id);
                                return next.length
                                  ? next
                                  : [createBulkComment()];
                              });
                              if (isActive) setActiveBulkId(null);
                            }}
                            className="w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors mx-auto"
                            title="Delete row"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Off-screen render div for Download ALL */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            left: "-99999px",
            top: 0,
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <div ref={bulkRenderRef}>
            {bulkRenderRow && renderPreviewForRow(bulkRenderRow)}
          </div>
        </div>

        {Dialogs}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] px-2 sm:px-8 lg:px-32 py-4 sm:py-6">
      <div className="flex w-full h-full max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-elevated border border-border">
        {/* Left Sidebar */}
        <aside className="w-[300px] flex-shrink-0 bg-sidebar-bg flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 flex flex-col gap-4">
            {ModeToggle}

            <>
              {/* Platform */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-sidebar-text-muted uppercase tracking-wider">
                  Platform
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    ["tiktok", "instagram", "youtube", "twitter"] as Platform[]
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() =>
                        router.push(`/tools/${p}-comment-generator`)
                      }
                      className={`h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        data.platform === p
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"
                      }`}
                    >
                      {platformIcons[p]}
                    </button>
                  ))}
                </div>
                <div
                  className={`grid gap-1.5 ${subModes.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                >
                  {subModes.map((sm) => (
                    <button
                      key={sm.value}
                      onClick={() => update({ subMode: sm.value })}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                        data.subMode === sm.value
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"
                      }`}
                    >
                      {sm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Controls */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-sidebar-text-muted uppercase tracking-wider">
                  Comment Controls
                </label>
                <div className="flex gap-1.5 items-center">
                  <div className="flex-1 relative">
                    <User
                      size={12}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted"
                    />
                    <input
                      type="text"
                      value={data.username}
                      onChange={(e) => update({ username: e.target.value })}
                      placeholder="username"
                      className="w-full h-8 pl-7 pr-7 rounded-lg glass-input text-xs"
                    />
                    <Upload
                      size={11}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted cursor-pointer hover:text-sidebar-text"
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  {isTwitter && (
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-text-muted text-xs">
                        @
                      </span>
                      <input
                        type="text"
                        value={data.displayName}
                        onChange={(e) =>
                          update({ displayName: e.target.value })
                        }
                        placeholder="Display Name"
                        className="w-full h-8 pl-7 pr-2 rounded-lg glass-input text-xs"
                      />
                    </div>
                  )}
                  {showBadge && (
                    <button
                      onClick={() => update({ isVerified: !data.isVerified })}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        data.isVerified
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"
                      }`}
                      title="Toggle verified badge"
                    >
                      <BadgeCheck size={13} />
                    </button>
                  )}
                  <div className="relative" ref={randomMenuRef}>
                    <button
                      onClick={() => setShowRandomMenu(!showRandomMenu)}
                      className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-sidebar-text-muted hover:text-sidebar-text transition-colors flex-shrink-0"
                      title="Generate Random Identity"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                      </svg>
                    </button>
                    {showRandomMenu && (
                      <div className="absolute top-full right-0 mt-1 w-36 rounded-lg glass-panel shadow-elevated z-50 py-1 border border-sidebar-border">
                        <button
                          onClick={() => randomize("male")}
                          className="w-full px-3 py-2 text-left text-xs text-sidebar-text hover:bg-sidebar-surface flex items-center gap-2"
                        >
                          <span>👨</span> Male
                        </button>
                        <button
                          onClick={() => randomize("female")}
                          className="w-full px-3 py-2 text-left text-xs text-sidebar-text hover:bg-sidebar-surface flex items-center gap-2"
                        >
                          <span>👩</span> Female
                        </button>
                        <button
                          onClick={() => randomize("celebrity")}
                          className="w-full px-3 py-2 text-left text-xs text-sidebar-accent hover:bg-sidebar-surface flex items-center gap-2"
                        >
                          <span>✨</span> Celebrity
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {showMetrics && (
                  <div className="flex gap-1.5 flex-wrap items-center">
                    <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                      <Clock size={11} className="text-sidebar-text-muted" />
                      <input
                        type="text"
                        value={data.time}
                        onChange={(e) => update({ time: e.target.value })}
                        className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                      />
                      <select
                        value={data.timeUnit}
                        onChange={(e) => update({ timeUnit: e.target.value })}
                        className="bg-transparent text-sidebar-text-muted text-[10px] cursor-pointer"
                      >
                        <option value="hrs">hrs</option>
                        <option value="days">days</option>
                        <option value="wks">wks</option>
                        <option value="months">months</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                      <Heart size={11} className="text-pink-400" />
                      <input
                        type="text"
                        value={data.likes}
                        onChange={(e) => update({ likes: e.target.value })}
                        className="w-10 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                      />
                    </div>
                    <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                      <MessageCircle
                        size={11}
                        className="text-sidebar-text-muted"
                      />
                      <input
                        type="text"
                        value={data.replies}
                        onChange={(e) => update({ replies: e.target.value })}
                        className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                      />
                    </div>
                    {isTwitter && (
                      <>
                        <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                          <Repeat2
                            size={11}
                            className="text-sidebar-text-muted"
                          />
                          <input
                            type="text"
                            value={data.retweets}
                            onChange={(e) =>
                              update({ retweets: e.target.value })
                            }
                            className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                          />
                        </div>
                        <div className="flex items-center gap-1 glass-panel rounded-lg px-2 h-7">
                          <BarChart3
                            size={11}
                            className="text-sidebar-text-muted"
                          />
                          <input
                            type="text"
                            value={data.views}
                            onChange={(e) => update({ views: e.target.value })}
                            className="w-6 bg-transparent text-sidebar-text text-xs text-center tabular-nums"
                          />
                        </div>
                      </>
                    )}
                    <button
                      onClick={randomizeStats}
                      className="w-7 h-7 rounded-lg glass-panel flex items-center justify-center text-sidebar-text-muted hover:text-sidebar-text transition-colors flex-shrink-0"
                      title="Randomize stats"
                    >
                      <Shuffle size={11} />
                    </button>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center px-0.5">
                    <span className="text-[10px] font-bold text-sidebar-text-muted uppercase tracking-wider">
                      Message
                    </span>
                    <span className="text-[10px] text-sidebar-text-muted tabular-nums">
                      {data.message.length} chars
                    </span>
                  </div>
                  <textarea
                    ref={textareaRef}
                    rows={4}
                    value={data.message}
                    onChange={(e) => update({ message: e.target.value })}
                    onSelect={handleTextSelect}
                    onMouseUp={handleTextSelect}
                    onKeyUp={handleTextSelect}
                    onBlur={handleTextBlur}
                    className="w-full p-2.5 rounded-lg glass-input text-xs resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Advanced Edits */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-sidebar-text-muted uppercase tracking-wider">
                  Advanced Edits
                </label>
                <p className="text-[9px] text-sidebar-text-muted italic">
                  💡 Select text in message box or preview, then click
                </p>
                <div className="flex gap-1.5">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAdvancedEdit("highlight")}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${savedSelection ? "glass-panel text-sidebar-text-muted hover:text-yellow-400 cursor-pointer" : "glass-panel text-sidebar-text-muted opacity-40 cursor-not-allowed"}`}
                    title="Highlight selected text"
                  >
                    <Highlighter size={13} />
                  </button>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAdvancedEdit("blur")}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${savedSelection ? "glass-panel text-sidebar-text-muted hover:text-blue-400 cursor-pointer" : "glass-panel text-sidebar-text-muted opacity-40 cursor-not-allowed"}`}
                    title="Blur selected text"
                  >
                    <EyeOff size={13} />
                  </button>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAdvancedEdit("cut")}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${savedSelection ? "glass-panel text-sidebar-text-muted hover:text-red-400 cursor-pointer" : "glass-panel text-sidebar-text-muted opacity-40 cursor-not-allowed"}`}
                    title="Remove selected text"
                  >
                    <Scissors size={13} />
                  </button>
                  <button
                    onClick={handleUndo}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${editHistory.length <= 1 && data.annotations.length === 0 ? "glass-panel text-sidebar-text-muted opacity-40 cursor-not-allowed" : "glass-panel text-sidebar-text-muted hover:text-sidebar-text"}`}
                    disabled={
                      editHistory.length <= 1 && data.annotations.length === 0
                    }
                    title="Undo"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>
            </>
          </div>

          {/* Export bar */}
          <div className="p-4 pt-0">
            <div className="flex gap-2 pt-3 border-t border-sidebar-border">
              <button
                onClick={exportImage}
                className="flex-1 h-9 gradient-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
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

        {/* Right Preview Canvas */}
        <section className="flex-1 bg-canvas-bg grid-dots relative flex flex-col overflow-hidden">
          {/* Preview header bar */}
          <div className="flex items-center justimax-w-[850px] justify-between px-5 py-2.5 border-b border-border bg-gradient-primary backdrop-blur-sm">
            <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
              Preview
            </span>
            <button
              onClick={() =>
                update({
                  previewTheme:
                    data.previewTheme === "light" ? "dark" : "light",
                })
              }
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                data.previewTheme === "dark"
                  ? "bg-[hsl(240,5%,20%)] border-[hsl(240,5%,30%)] text-[hsl(240,5%,70%)] hover:text-white"
                  : "border-border text-foreground/50 hover:text-foreground"
              }`}
              title={
                data.previewTheme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {data.previewTheme === "light" ? (
                <Moon size={14} />
              ) : (
                <Sun size={14} />
              )}
            </button>
          </div>

          {/* Preview Area */}
          <div
            className={`flex-1 flex items-center justify-center p-12 ${data.previewTheme === "dark" ? "bg-gray-200 dark-grid-dots" : "bg-gray-200 dark-grid-dots"} overflow-auto `}
            onMouseUp={handlePreviewMouseUp}
          >
            <div ref={previewRef}>{renderPreview()}</div>
          </div>
        </section>
      </div>
      {Dialogs}
    </div>
  );
};

export default CommentTool;
