interface InstalledProps {
  active: string;
  installed: string[];
}

export const Installed = ({ active, installed }: InstalledProps) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="mb-4 text-xl font-black">Installed</div>
      <div className="ml-8 space-y-2 md:m-0">
        {installed.map((i) => (
          <div key={i}>
            {i}
            {active === i ? (
              <span className="ml-2 text-green-400">(Active)</span>
            ) : (
              <button
                className="p-1 ml-2 rounded-md hover:bg-slate-600 bg-slate-900"
              >
                Use
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
