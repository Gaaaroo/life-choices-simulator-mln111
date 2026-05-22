type Props = {
  items: string[];
};

export function EffectFeedback({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="animate-pulse rounded-lg bg-teal-deep/10 px-3 py-1 text-sm font-semibold text-teal-deep"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
