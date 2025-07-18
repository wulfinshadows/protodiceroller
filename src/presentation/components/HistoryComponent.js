export default function HistoryComponent({ history }) {
  return (
    <div className="w-full text-black pl-4">
      {history.map(({ rolls, total }, index) => (
        <div key={index} className="h-fit p-4 mt-4 bg-white rounded-md shadow">
          <div className="space-y-1">
            {rolls.map((line, i) => (
              <p key={i} className="text-sm">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-2 font-semibold">Total: {total}</p>
        </div>
      ))}
    </div>
  );
}
