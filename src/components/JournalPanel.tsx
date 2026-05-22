type Props = {
  entries: string[];
};

export function JournalPanel({ entries }: Props) {
  if (entries.length === 0) return null;

  const recent = entries.slice(-4);

  return (
    <aside className="rounded-2xl bg-white/70 p-3 shadow-sm">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-deep">
        Nhật ký
      </h3>
      <ul className="space-y-1.5 text-xs text-slate-600">
        {recent.map((entry, i) => (
          <li key={`${i}-${entry}`} className="border-l-2 border-accent/60 pl-2">
            {entry}
          </li>
        ))}
      </ul>
    </aside>
  );
}
