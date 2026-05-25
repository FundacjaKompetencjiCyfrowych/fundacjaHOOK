export default function WirePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-dashed border-subtle bg-page text-[10px] font-medium uppercase tracking-wide text-muted">
      {label}
    </div>
  );
}
