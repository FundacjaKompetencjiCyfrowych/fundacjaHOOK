const SortByOrder = ({ sort, setSort }: { sort: string; setSort: (sort: string) => void }) => {
  return (
    <label className="inline-flex items-center gap-2 text-muted-foreground text-sm">
      Sortuj:
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as string)}
        className="bg-background px-2 py-1 border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground text-sm"
      >
        <option value="Najnowsze">Najnowsze</option>
        <option value="Najstarsze">Najstarsze</option>
      </select>
    </label>
  );
};

export default SortByOrder;
